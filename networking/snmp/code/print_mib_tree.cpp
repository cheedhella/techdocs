// print_mib_tree.cpp
// Build: g++ print_mib_tree.cpp -o print_mib_tree $(net-snmp-config --cflags --libs)

#include <net-snmp/net-snmp-config.h>
#include <net-snmp/net-snmp-includes.h>

#include <iostream>
#include <cstring>
#include <string>
#include <vector>

void init_session(struct snmp_session &ss, const std::string &peer, const std::string &community) {
    snmp_sess_init(&ss);
    ss.peername = strdup(peer.c_str());
    ss.version = SNMP_VERSION_2c; // use SNMPv2c by default
    ss.community = (u_char*)strdup(community.c_str());
    ss.community_len = community.length();
    ss.retries = 2;
    ss.timeout = 1000000L;
}

// print a single OID (symbolic if MIBs are loaded), and optionally the value
std::string oid_to_string(const oid *o, size_t o_len) {
    char buf[1024];
    if (snprint_objid(buf, sizeof(buf), o, o_len) <= 0) {
        // fallback: format numeric manually
        std::string s = "";
        for (size_t i = 0; i < o_len; ++i) {
            if (i) s += ".";
            s += std::to_string(o[i]);
        }
        return s;
    }
    return std::string(buf);
}

int print_mib_tree(struct snmp_session *ss, const char *root_oid_str) {
    oid root_oid[MAX_OID_LEN];
    size_t root_oid_len = MAX_OID_LEN;

    if (!snmp_parse_oid(root_oid_str, root_oid, &root_oid_len)) {
        snmp_perror(root_oid_str);
        return -1;
    }

    // start walking at root_oid
    oid cur_oid[MAX_OID_LEN];
    size_t cur_oid_len = root_oid_len;
    memcpy(cur_oid, root_oid, root_oid_len * sizeof(oid));

    while (true) {
        struct snmp_pdu *pdu = snmp_pdu_create(SNMP_MSG_GETNEXT);
        snmp_add_null_var(pdu, cur_oid, cur_oid_len);

        struct snmp_pdu *response = nullptr;
        int status = snmp_synch_response(ss, pdu, &response);
        if (status != STAT_SUCCESS || !response) {
            if (status == STAT_TIMEOUT) {
                std::cerr << "Timeout while walking " << ss->peername << "\n";
            } else {
                snmp_sess_perror("snmp_synch_response", ss);
            }
            if (response) snmp_free_pdu(response);
            return 1;
        }

        if (response->errstat != SNMP_ERR_NOERROR) {
            std::cerr << "Error in packet: " << snmp_errstring(response->errstat) << "\n";
            snmp_free_pdu(response);
            return 1;
        }

        netsnmp_variable_list *vars = response->variables;
        if (!vars) {
            snmp_free_pdu(response);
            break;
        }

        // stop if OID is not inside subtree (prefix match)
        if (vars->name_length < root_oid_len ||
            memcmp(root_oid, vars->name, root_oid_len * sizeof(oid)) != 0) {
            snmp_free_pdu(response);
            break;
        }

        // compute depth relative to root and print indentation
        int depth = (int)vars->name_length - (int)root_oid_len;
        if (depth < 0) depth = 0;
        // limit indentation size for safety
        int indent = std::min(depth, 40);

        std::string name = oid_to_string(vars->name, vars->name_length);

        // print name (symbolic if available) and a short value/type
        char valbuf[1024];
        snprint_value(valbuf, sizeof(valbuf), vars->name, vars->name_length, vars);
        // Compose line: indentation + name + " = " + value
        for (int i = 0; i < indent; ++i) std::cout << "  ";
        std::cout << name << " = " << valbuf << "\n";

        // prepare next OID
        cur_oid_len = vars->name_length;
        memcpy(cur_oid, vars->name, cur_oid_len * sizeof(oid));

        snmp_free_pdu(response);
    }

    return 0;
}

int main(int argc, char **argv) {
    if (argc < 3) {
        std::cerr << "Usage: " << argv[0] << " <peer:host[:port]> <community> [rootOID]\n";
        std::cerr << "Example: " << argv[0] << " 192.168.1.1 public 1.3.6.1\n";
        std::cerr << "Default rootOID is 1.3.6.1 (internet subtree)\n";
        return 1;
    }

    std::string peer = argv[1];
    std::string community = argv[2];
    const char *root_oid = (argc >= 4) ? argv[3] : "1.3.6.1";

    // initialize library & MIBs
    init_snmp("print_mib_tree");    // loads MIBs if configured
    snmp_log(LOG_INFO, "Starting print_mib_tree\n");

    struct snmp_session sess;
    init_session(sess, peer, community);

    struct snmp_session *ss = snmp_open(&sess);
    if (!ss) {
        snmp_perror("snmp_open");
        return 1;
    }

    int rc = print_mib_tree(ss, root_oid);

    snmp_close(ss);
    SOCK_CLEANUP;
    return rc;
}
