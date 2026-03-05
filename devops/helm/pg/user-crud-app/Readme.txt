================================================================
  User CRUD App — Helm Chart
================================================================

Chart location : devops/helm/pg/user-crud-app/
Docker image   : docker.io/cheedhella/user-crud-app
Source app     : devops/jib/pg/UserCrudApp/

================================================================
  STEP 1 — Build and push the Docker image (Jib)
================================================================

  cd devops/jib/pg/UserCrudApp

  # Option A: Push directly to Docker Hub (requires auth)
  export DOCKER_USERNAME=cheedhella
  export DOCKER_PASSWORD=<your-docker-hub-password>
  mvn compile jib:build

  # Option B: Load into local Docker daemon (no auth needed)
  mvn compile jib:dockerBuild

  # Verify the image
  docker images | grep user-crud-app

================================================================
  STEP 2 — Validate the Helm chart
================================================================

  cd devops/helm/pg/

  # Lint
  helm lint ./user-crud-app

  # Render templates locally to inspect the output
  helm template my-release ./user-crud-app

  # Dry-run against a running cluster
  helm install my-release ./user-crud-app --dry-run --debug

================================================================
  STEP 3 — Deploy to Kubernetes
================================================================

  # Install
  helm install my-release ./user-crud-app

  # Or install with overrides
  helm install my-release ./user-crud-app \
    --set replicaCount=2 \
    --set image.tag=1.0-SNAPSHOT

  # Check rollout status
  kubectl rollout status deployment/my-release-user-crud-app

  # Verify the pod is running
  kubectl get pods -l app.kubernetes.io/name=user-crud-app

================================================================
  STEP 4 — Test the deployment
================================================================

  # Run the built-in Helm test (curl pod)
  helm test my-release

  # Port-forward to access locally
  kubectl port-forward svc/my-release-user-crud-app 8080:8080

  # --- In a separate terminal ---

  # List users (empty initially)
  curl http://localhost:8080/api/users

  # Create a user
  curl -X POST http://localhost:8080/api/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Alice"}'

  # Create another user
  curl -X POST http://localhost:8080/api/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Bob"}'

  # List all users
  curl http://localhost:8080/api/users

  # Get user by ID
  curl http://localhost:8080/api/users/1

  # Update a user
  curl -X PUT http://localhost:8080/api/users/1 \
    -H "Content-Type: application/json" \
    -d '{"name": "Alice Updated"}'

  # Delete a user
  curl -X DELETE http://localhost:8080/api/users/2

  # Confirm deletion
  curl http://localhost:8080/api/users

================================================================
  STEP 5 — Upgrade / Rollback
================================================================

  # Upgrade (e.g., new image tag or replica count)
  helm upgrade my-release ./user-crud-app --set image.tag=2.0.0

  # Check history
  helm history my-release

  # Rollback to previous revision
  helm rollback my-release 1

================================================================
  STEP 6 — Uninstall
================================================================

  helm uninstall my-release

================================================================
  STEP 7 — (Optional) Push chart to Docker Hub as OCI artifact
================================================================

  # Login
  helm registry login registry-1.docker.io

  # Package
  helm package ./user-crud-app

  # Push
  helm push user-crud-app-0.1.0.tgz oci://registry-1.docker.io/cheedhella

  # Others can install with:
  helm install my-release oci://registry-1.docker.io/cheedhella/user-crud-app --version 0.1.0

================================================================
  Chart values reference
================================================================

  replicaCount       — number of pod replicas          (default: 1)
  image.repository   — Docker image name               (default: cheedhella/user-crud-app)
  image.tag          — image tag                       (default: latest)
  image.pullPolicy   — pull policy                     (default: IfNotPresent)
  service.type       — k8s Service type                (default: ClusterIP)
  service.port       — Service port                    (default: 8080)
  resources          — CPU/memory requests and limits
  livenessProbe      — liveness probe configuration
  readinessProbe     — readiness probe configuration
