What problems Global Topology solves?
    As a network administrator, there is no single place to visualize the entire topology and manage the network;
    https://academy.broadcom.com/blog/network-observability/network-monitoring/broadcom-unveils-dx-netops-global-topology

    DA/DC - CDP, LLDP, SAT 
    VNA - SD-WAN(like vipitela, dnac, aci, silverpeak etc);
    Spectrum - Alarms/Faults;

How it works?
    Initial Full Sync(One time)
        - What it does?
            - It pulls all the inventory from legacy systems to neo4j(via Kafka);
        - How it works?
            - User configures GAS IP/Port in portal and initiates fullsync via Sync button; When the application is started both live and full sync consumers are stopped?
            - Portal calls /fullSync on GAS;
                -- PROBLEM: What if user clicks on sync button multiple times? How can we prevent multiple full syncs running at the same time?
                -- PROBLEM: What if there are multiple TS running? Whose responsbility is it to request DA for full inventory?
                    -- It first acquires a cache lock and updates the status to INITIATED(so that it blocks immediate duplicate API requests) and sends INITIATE_FULL_SYNC to all partitions of the control topic;
                    -- TS1 and TS2 consume INITIATE_FULL_SYNC each message, increments a counter in HZ and starts full inventory consumer on TS side, which processes the inventory to Neo4j; 
                    -- Once the counter is equal to the number of partitions(whichever TS consumes the last message):
                        --- It updates the sync status to IN_PROGRESS;
                        --- It sends SEND_FULL_INVENTORY command to DA via control topic, so that DA actually starts writing inventory to full sync topic;
                    -- PROBLEM: What if you have 4 partitions in a kafka topic and 2 instances of a consumer(A and B), Kafka might assign all paritions to Instance A?
                        --- Normally, Kafka tries to balance partitions across consumers; Yes, it can happen—but only temporarily or in edge cases;
                        --- When B is down, Kafka assigns all partitions to A;
                        --- If A joins first → gets all 4 partitions and B joins later → triggers rebalance; Before rebalance completes, A may briefly hold all partitions;
                        --- If there 10 instances and only 4 partitions, 6 instances will remain idle;
            - DA, after receiving SEND_FULL_INVENTORY, starts writing inventory to full inventory topic; Once it completes writing, It writes FULL_SYNC_DONE to all partitions of the full inventory topic;
            - TS1 and TS2 consume each FULL_SYNC_DONE message, increments a counter in HZ and once the counter is equal to number of topics(that means completed processing inventory in all paritions);
            - Whichever TS consumes the last FULL_SYNC_DONE, it updates the status COMPLETED;
             

            - PROBLEM: What happens if DA is restarted when sync is in-progress?
                -- When the DA restarts, it publishes a DA_RESTARTED meta record to the full inventory topic;
                -- TS consumes these records and If it sees that a full sync is currently running, it immediately broadcasts a TERMINATE_FULL_SYNC control record to all partitions;
                - When TS consumes this TERMINATE_FULL_SYNC record across all partitions, it stops the full sync consumers, restarts the live consumer and increments a counter;
                -- Whichever TS process the last TERMINATE_FULL_SYNC record, updates the full sync status in HZ to FAILED;
                
            - MetaCache Full States 
                - NEVER_RUN         -> Initial default state;
                - INITIATED   -> When user requests fullsync, status is first updated to INITIATED(so that it blocks immediate duplicate API requests) and sends INITIATE_FULL_SYNC to all partitions of the full sync topic;
                - IN_PROGRESS       -> Whichever TS process the last INITIATE_FULL_SYNC record, updates the state to IN_PROGRESS and requests DA for sending full inventory;
                - COMPLETED         -> sync completed succesfully;
                - FAILED            -> When DA restarted;

            - PROBLEM: What happens if NEO4J down? added error handling;
            - PROBLEM: What happens if HZ is down? HZ persistence;

        - Once all inventory is synced to Neo4j, we keep getting alarms from Spectrum;

--------------------------------------------------------------------------------------------
Microservice patterns 

Based on the IFM codebase architecture we've explored, the system implements several classic microservice design patterns. Here are the primary patterns being used, along with how they are applied in this specific project:
1. Event-Driven Architecture (Publish-Subscribe)
    Instead of microservices calling each other synchronously via HTTP (which creates tight coupling and bottlenecks), all services communicate asynchronously using Apache Kafka;

2. CQRS(Command Query Responsibility Segregation)
    System strictly separates the responsibility of writing data from the responsibility of reading data
    Command/Write -> topology-service/connection-service consumes Kafka messages (commands to create/update/delete) and writes them to the Neo4j graph database. It exposes almost no REST APIs.
    Query/Read -> GAS exposes REST APIs (like /topology/default and /triage/topology) for the UI to query the Neo4j database. It does not consume the heavy Kafka inventory traffic.
 
3. SAGA Pattern -> Choreography (Decentralized Coordination, event-based) vs Orchestration(central controller) -> It breaks the txn into smaller steps; Each step has a compensating action if something fails;
    When a complex, multi-step distributed transaction is required (like the Full Sync), the system uses Choreography rather than a central Orchestrator.
    Example: There is no single "Sync Manager" service that synchronously tells the DA to start, tells the topology service to switch consumers, and tells the rollup service to pause. Instead, the API emits a single INITIATE_FULL_SYNC event. Each service independently listens for that event, knows what its specific job is, does it, and emits a follow-up event (like FULL_SYNC_DONE) when finished.

4. Backend for Frontend (BFF) / API Gateway
    graph-store-api-service acts as an aggregation layer tailored for UI; It exposes highly specific endpoints like /triage/topology and /topology/search;
--------------------------------------------------------------------------------------------
Unresolved Item Processor 
    - What is the purpose of unresolved items cache? can we not simply ignore the record, if item is not there in neo4j db?
    - No, Imagine the Data Aggregator (DA) discovers a new Router and immediately updates its IP Address. The DA sends two messages to Kafka:
        CREATE Router 123
        UPDATE Router 123 (Set IP to 10.0.0.1)
        Because Kafka distributes messages across partitions, or due to network latency and batching, it is highly possible that the topology-service receives the UPDATE message before it receives the CREATE message.
    - By using the UnResolvedItemCache, the topology-service guarantees eventual consistency. 
      It ensures that no matter what order the messages arrive in, the final node saved to Neo4j will have all of its correct, correct, and the most recent, correct properties.
------------------------------------------------------------------------------------------------------
Why we have separate consumers for FS and LS? FS flow we need to reset databases and caches;
what is the purpose of connection service?





Distributed Caching and Locking
Because microservices are scaled horizontally (multiple instances of topology-service running at once), they cannot rely on local memory (RAM) to track state.
Example: The system uses Hazelcast as a distributed cache (MetaCache). When 4 different Kafka partitions are processed by 2 different instances, they all increment a shared Hazelcast counter (FS_COUNT_KEY).
Example: To prevent race conditions (e.g., two instances trying to update the sync status to IN_PROGRESS at the exact same millisecond), Hazelcast distributed locks are used (lock() and unlock() in Cache.java) to ensure thread safety across the entire cluster.












 How does a user initiate the full sync?
A user initiates the full sync by making a request to the  REST API endpoint exposed by the graph-store-api-service (TopologyController.java).
When this endpoint is called:
It checks the Hazelcast .
.
It broadcasts an INITIATE_FULL_SYNC control record to all partitions of the Kafka control topic (ts-control-topic).
2. How does topology-service work during the sync?
The topology-service manages the lifecycle of the sync by toggling different Kafka consumers and processing the incoming data batches:
Switching Consumers: When InventoryProcessor receives the INITIATE_FULL_SYNC control record across all partitions, it stops the LIVE_INVENTORY_CONSUMER (which handles incremental updates) and starts the FULL_INVENTORY_CONSUMER.
Requesting Data: It sets the cache status to IN_PROGRESS and sends a SEND_FULL_INVENTORY control record to tell the Data Aggregator (DA) to start publishing the full inventory.
Processing Inventory: The DA publishes inventory records to the da.fullsync topic. The FULL_INVENTORY_CONSUMER reads these records in batches, and InventoryProcessor routes them to specific ItemProcessors to handle creations, updates, and deletions in the Neo4j graph database.
Handling Unresolved Relations: Once the DA finishes sending the inventory, it sends a FULL_SYNC_DONE meta record. The topology-service then stops the FULL_INVENTORY_CONSUMER, starts the UNRESOLVED_RELATIONS_CONSUMER, and broadcasts an INITIATE_UNRESOLVED_RELATIONS_PROCESSING signal to process any relationships that couldn't be resolved during the initial inventory load.
3. How is the sync completed?
The completion phase is triggered once the unresolved relations are fully processed:
Completion Signal: An UNRESOLVED_RELATIONS_PUBLISHING_DONE meta record is received. Once MetaRecordProcessor verifies this signal has arrived across all partitions, it broadcasts a FULL_SYNC_COMPLETED control record to the control topic.
Restoring Normal Operations: When InventoryProcessor receives the FULL_SYNC_COMPLETED record, it stops the UNRESOLVED_RELATIONS_CONSUMER and restarts the LIVE_INVENTORY_CONSUMER to resume normal real-time updates.
Finalizing State: The FullSyncStatus in the Hazelcast MetaCache is updated to COMPLETED, the end time is recorded, and final cleanup tasks (like creating technology folders for tenants) are executed.



    Later updates:
    A link goes down in Spectrum
Spectrum publishes an alarm event → Kafka
Alarm Consumer Service:
Maps alarm to topology node
Neo4j already knows:
What depends on that link
Rollup Service:
Determines impacted services
Fault Isolation:
Identifies root cause
Suppresses secondary alarms
Portal:
Shows impact + root cause visually

Problems Solved?






public void setFullSyncStatus(FullSyncStatus fsStatus) {
  Map<String, AtomicLong> metaCache = getCache(getName());
  // 1. Acquire a distributed lock on the specific key with a lease time
  lock(metaCache, FULL_SYNC_STATUS, leaseTime, TimeUnit.SECONDS);
  try {
      // 2. Perform the update safely
      metaCache.put(FULL_SYNC_STATUS, new AtomicLong(fsStatus.getStatusCode()));
  } finally {
      // 3. Always release the lock
      unlock(metaCache, FULL_SYNC_STATUS);
  }
}


------------------------------------------------
Keycloak:
1. It supports multiple ways of authentication:
    Username/password
    OTP / MFA
    Social login (Google, GitHub)
    SSO (Single Sign-On)
2. Realm = Company
   Group = Department
   Each group will have it's set of users; Permissions are usally defined at the group level;
3. It has it's own dashboard to manage users;

User logs in via web/mobile;
Request is redirected to Keycloak;
If successful, keycloak issues a JWT token to client; JWT token has userId, roles, expiry etc;

DOes client store cookies somewhere?
    - Server usually sends a HTTP-only cookie: Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
    - Browser takes care of storing them securly;
    - JS code can't access these cookies(using docuemnt.cookies etc);
    - But, for every request to server, clients add the cookie is added to request; // Authorization: Bearer <access_token>
    - 

How microservices validate the token?
    JWT token is signed using Keycloak’s private key;
    Microservice first get the keycloak's public key: /realms/{realm}/protocol/openid-connect/certs
    Then, they use the pubic key to verify it;
    It signature fails -> token is fake -> reject;








 (web/mobile)
Request is redirected to Authorization Server

👉 Example: login via Keycloak/Auth0

2. Token Issuance

After successful authentication:

Authorization server returns:
Access Token (JWT)
Refresh Token

The JWT contains:

user ID
roles/permissions (claims)
expiry