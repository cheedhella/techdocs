// snmp_tool.cpp
// Build: g++ snmp_tool_v2c.cpp -o snmp_tool $(net-snmp-config --cflags --libs)
// Run: 
/*
./snmp_tool 10.255.77.106 public get 1.3.6.1.2.1.1.1.0      # SNMPv2c GET sysDescr.0
Starting snmp_tool
SNMPv2-MIB::sysDescr.0 = STRING: Huawei AC6805
Huawei Versatile Routing Platform Software
VRP (R) software, Version 5.170 (AC6805 V200R022C00SPC100)
Copyright (C) 2011-2022 Huawei Technologies Co., Ltd
*/

/*
# Walk system subtree
./snmp_tool 192.168.1.100 public walk 1.3.6.1.2.1.1
Starting snmp_tool
SNMPv2-MIB::sysDescr.0 = STRING: Huawei AC6805
Huawei Versatile Routing Platform Software
VRP (R) software, Version 5.170 (AC6805 V200R022C00SPC100)
Copyright (C) 2011-2022 Huawei Technologies Co., Ltd
SNMPv2-MIB::sysObjectID.0 = OID: SNMPv2-SMI::enterprises.2011.2.240.18
DISMAN-EVENT-MIB::sysUpTimeInstance = Timeticks: (1219580626) 141 days, 3:43:26.26
SNMPv2-MIB::sysContact.0 = STRING: LAN-Support KS, Tel.: +49 561 490 1300
SNMPv2-MIB::sysName.0 = STRING: Sim39189:p14wlc-vo01
SNMPv2-MIB::sysLocation.0 = STRING: LDR1 Rack 06/06
SNMPv2-MIB::sysServices.0 = INTEGER: 78
*/

#include <net-snmp/net-snmp-config.h>
#include <net-snmp/net-snmp-includes.h>

#include <iostream>
#include <vector>
#include <string>

void init_snmp_session(struct snmp_session &ss, const std::string &peer, const std::string &community) {
    snmp_sess_init(&ss);
    ss.peername = strdup(peer.c_str());
    ss.version = SNMP_VERSION_2c;           // using SNMP v2c here
    ss.community = (u_char*)strdup(community.c_str());
    ss.community_len = community.length();
    // Optionally set timeout/retries:
    ss.retries = 2;
    ss.timeout = 1000000L; // microseconds
}

int do_get(struct snmp_session *ss, const char *oid_str) {
    struct snmp_pdu *pdu;
    struct snmp_pdu *response;
    oid anOID[MAX_OID_LEN];
    size_t anOID_len = MAX_OID_LEN;

    if (!snmp_parse_oid(oid_str, anOID, &anOID_len)) {
        snmp_perror(oid_str);
        return -1;
    }

    pdu = snmp_pdu_create(SNMP_MSG_GET);
    snmp_add_null_var(pdu, anOID, anOID_len);

    int status = snmp_synch_response(ss, pdu, &response);
    if (status == STAT_SUCCESS && response->errstat == SNMP_ERR_NOERROR) {
        for (netsnmp_variable_list *vars = response->variables; vars; vars = vars->next_variable) {
            char buf[1024];
            snprint_variable(buf, sizeof(buf), vars->name, vars->name_length, vars);
            std::cout << buf << std::endl;
        }
    } else {
        if (status == STAT_SUCCESS) {
            std::cerr << "Error in packet: " << snmp_errstring(response->errstat) << std::endl;
        } else if (status == STAT_TIMEOUT) {
            std::cerr << "Timeout: No response from " << ss->peername << std::endl;
        } else {
            snmp_sess_perror("snmp_synch_response", ss);
        }
    }

    if (response)
        snmp_free_pdu(response);

    return (status == STAT_SUCCESS && response->errstat == SNMP_ERR_NOERROR) ? 0 : 1;
}

int do_walk(struct snmp_session *ss, const char *root_oid_str) {
    oid root_oid[MAX_OID_LEN];
    size_t root_oid_len = MAX_OID_LEN;

    if (!snmp_parse_oid(root_oid_str, root_oid, &root_oid_len)) {
        snmp_perror(root_oid_str);
        return -1;
    }

    oid cur_oid[MAX_OID_LEN];
    size_t cur_oid_len = root_oid_len;
    memcpy(cur_oid, root_oid, root_oid_len * sizeof(oid));

    while (true) {
        struct snmp_pdu *pdu = snmp_pdu_create(SNMP_MSG_GETNEXT);
        snmp_add_null_var(pdu, cur_oid, cur_oid_len);

        struct snmp_pdu *response = nullptr;
        int status = snmp_synch_response(ss, pdu, &response);
        if (status != STAT_SUCCESS || !response) {
            if (status == STAT_TIMEOUT)
                std::cerr << "Timeout." << std::endl;
            else
                snmp_sess_perror("snmp_synch_response", ss);
            if (response) snmp_free_pdu(response);
            return 1;
        }

        if (response->errstat != SNMP_ERR_NOERROR) {
            std::cerr << "Error in packet: " << snmp_errstring(response->errstat) << std::endl;
            snmp_free_pdu(response);
            return 1;
        }

        netsnmp_variable_list *vars = response->variables;
        if (!vars) {
            snmp_free_pdu(response);
            return 0;
        }

        // If the returned OID is no longer under the root subtree, stop.
        if (snmp_oid_compare(root_oid, root_oid_len, vars->name, vars->name_length) != 0 &&
            snmp_oidtree_compare(root_oid, root_oid_len, vars->name, vars->name_length) != 0) {
            // Not strictly necessary: check that name starts with root_oid prefix.
        }

        // Check whether returned OID is still in subtree (prefix match)
        if (vars->name_length < root_oid_len ||
            memcmp(root_oid, vars->name, root_oid_len * sizeof(oid)) != 0) {
            // finished walking the subtree
            snmp_free_pdu(response);
            break;
        }

        // Print variable
        char buf[1024];
        snprint_variable(buf, sizeof(buf), vars->name, vars->name_length, vars);
        std::cout << buf << std::endl;

        // Copy next OID to cur_oid for next GETNEXT
        cur_oid_len = vars->name_length;
        memcpy(cur_oid, vars->name, cur_oid_len * sizeof(oid));

        snmp_free_pdu(response);
    }

    return 0;
}

int main(int argc, char **argv) {
    if (argc < 5) {
        std::cerr << "Usage: " << argv[0] << " <peer:host[:port]> <community> <get|walk> <OID>\n";
        std::cerr << "Example: " << argv[0] << " 192.168.1.1 public get 1.3.6.1.2.1.1.1.0\n";
        std::cerr << "Example: " << argv[0] << " mydevice public walk 1.3.6.1.2.1.1\n";
        return 1;
    }

    std::string peer = argv[1];
    std::string community = argv[2];
    std::string action = argv[3];
    const char *oid = argv[4];

    // Initialize SNMP library
    init_snmp("snmp_tool");
    snmp_log(LOG_INFO, "Starting snmp_tool\n");

    struct snmp_session sess;
    init_snmp_session(sess, peer, community);

    // open the session
    struct snmp_session *ss = snmp_open(&sess);
    if (!ss) {
        snmp_perror("snmp_open");
        return 1;
    }

    int rc = 0;
    if (action == "get") {
        rc = do_get(ss, oid);
    } else if (action == "walk") {
        rc = do_walk(ss, oid);
    } else {
        std::cerr << "Unknown action: " << action << "\n";
        rc = 1;
    }

    snmp_close(ss);
    SOCK_CLEANUP;
    return rc;
}
