# A simple Spring Boot REST API demonstrating containerization with Google Jib.

### 1. Navigate to project
cd /Users/mcheedhe/Data/techdocs/devops/jib/pg

### 2. Build and Run Locally
mvn clean package
mvn spring-boot:run

### 3. Test the Application
curl http://10.253.229.200:8080/api/hello
curl http://10.253.229.200:8080/api/hello/World
curl http://10.253.229.200:8080/api/health

### 4.1 Build Docker Image to local docker daemon
mvn compile jib:dockerBuild

# docker images
REPOSITORY             TAG            IMAGE ID       CREATED             SIZE
cheedhella/jib-demo    1.0-SNAPSHOT   f9180e289309   5 seconds ago       286MB
cheedhella/jib-demo    latest         f9180e289309   5 seconds ago       286MB

### 4.2 Build and push to registry
# Option 1: Set environment variables in shell;
export DOCKER_USERNAME=cheedhella
export DOCKER_PASSWORD=<your-access-token>
mvn compile jib:build

# Options 2: pass directly from command line;
mvn compile jib:build -Djib.to.auth.username=cheedhella -Djib.to.auth.password=<access-token>
Note: You can also pass image name from CLI:  -Dimage=docker.io/cheedhella/jib-demo

# Option 3: Login before running
docker login -u cheedhella
Access Token: <access-token>









Docker Image Name 
    Syntax: [registry]/[namespace]/[repository]:[tag]
    Eg: docker.io/cheedhella/jib-demo:tagname

    Registry
        If you omit it, docker automatically assumes docker.io; // docker.io

    Namespace 
        Your docker hub account; // cheedhella 

    Repository 
        It specifies Image Name; // jib-demo

    tagname
        It specifies the version; // latest

    When you run: docker pull docker.io/cheedhella/jib-pg:tagname
        Docker will:
          Connect to Docker Hub
          Look under user cheedhella
          Find repository jib-pg
          Pull the image with tag tagname

    What happens, if Repository Does NOT Exist on Docker Hub?
        Docker will try to:
          Authenticate you
          Check if you own cheedhella
          Create the repository automatically (if allowed)




# Option 1: Interactive script
./quick-start.sh


### 3.
```bash
# Build to local Docker daemon

# Run the container
docker run -p 8080:8080 spring-boot-jib-demo:1.0-SNAPSHOT

# Build the application
mvn clean package

# Option 2: Run the application locally
mvn spring-boot:run

# Option 3: Build Docker image
mvn compile jib:dockerBuild

# Option 4: Run Docker container
docker run -p 8080:8080 spring-boot-jib-demo:1.0-SNAPSHOT

# Test the API
curl http://localhost:8080/api/hello

GET /api/hello - Basic hello message
GET /api/hello/{name} - Personalized greeting
GET /api/health - Custom health check
GET /actuator/health - Spring Boot actuator


curl http://localhost:8080/api/hello
curl http://localhost:8080/api/hello/John
curl http://localhost:8080/api/health
curl http://localhost:8080/actuator/health


# Option 3: Build as tarball
mvn compile jib:buildTar
docker load --input target/jib-image.tar


# Run container 
# Foreground
docker run -p 8080:8080 spring-boot-jib-demo:1.0-SNAPSHOT

# Background (detached)
docker run -d -p 8080:8080 --name spring-app spring-boot-jib-demo:1.0-SNAPSHOT

# With Docker Compose
docker-compose up -d

## Build Docker Image with Jib

### Option 1: Build to Local Docker Daemon

```bash
mvn compile jib:dockerBuild

# Run the container
docker run -p 8080:8080 spring-boot-jib-demo:1.0-SNAPSHOT
```

### Option 2: Build and Push to Registry

```bash
# Login to Docker Hub
docker login

# Build and push
mvn compile jib:build -Dimage=docker.io/YOUR_USERNAME/spring-boot-jib-demo:latest
```

### Option 3: Build as Tarball

```bash
mvn compile jib:buildTar

# Load into Docker
docker load --input target/jib-image.tar
```

## Available Endpoints

- `GET /api/hello` - Returns a hello message
- `GET /api/hello/{name}` - Returns a personalized greeting
- `GET /api/health` - Application health check
- `GET /actuator/health` - Spring Boot actuator health endpoint

## Docker Commands

```bash
# Run container
docker run -d -p 8080:8080 --name spring-app spring-boot-jib-demo:1.0-SNAPSHOT

# View logs
docker logs -f spring-app

# Stop container
docker stop spring-app

# Remove container
docker rm spring-app

# Remove image
docker rmi spring-boot-jib-demo:1.0-SNAPSHOT







# Quick Command Reference

## Maven Commands

```bash
# Clean and build
mvn clean package

# Run application locally
mvn spring-boot:run

# Build Docker image to local daemon
mvn compile jib:dockerBuild

# Build and push to registry
mvn compile jib:build

# Build as tarball
mvn compile jib:buildTar

# Skip tests
mvn clean package -DskipTests

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Docker Commands

```bash
# List images
docker images | grep spring-boot-jib-demo

# Run container
docker run -p 8080:8080 spring-boot-jib-demo:1.0-SNAPSHOT

# Run in background
docker run -d -p 8080:8080 --name spring-app spring-boot-jib-demo:1.0-SNAPSHOT

# View logs
docker logs spring-app
docker logs -f spring-app

# Execute commands in container
docker exec -it spring-app sh

# Stop and remove
docker stop spring-app
docker rm spring-app

# Remove image
docker rmi spring-boot-jib-demo:1.0-SNAPSHOT

# Inspect image
docker inspect spring-boot-jib-demo:1.0-SNAPSHOT

# View image history
docker history spring-boot-jib-demo:1.0-SNAPSHOT
```

## Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Remove volumes
docker-compose down -v
```

## Testing Endpoints

```bash
# Hello endpoint
curl http://localhost:8080/api/hello

# Hello with name
curl http://localhost:8080/api/hello/Docker

# Health check
curl http://localhost:8080/api/health

# Actuator health
curl http://localhost:8080/actuator/health

# Pretty print JSON
curl http://localhost:8080/api/hello | jq

# Test with headers
curl -H "Accept: application/json" http://localhost:8080/api/hello
```

## Jib Specific Commands

```bash
# Build with custom image name
mvn jib:build -Dimage=myregistry.io/myapp:v1.0

# Build with authentication
mvn jib:build \
  -Djib.to.auth.username=USERNAME \
  -Djib.to.auth.password=PASSWORD

# Build with custom JVM flags
mvn jib:build -Djib.container.jvmFlags=-Xmx1g,-Xms512m

# Build offline (use cached layers)
mvn jib:build -Djib.offline=true

# Build with verbose output
mvn jib:build -X

# Skip Jib execution
mvn package -Djib.skip=true
```

## Troubleshooting Commands

```bash
# Check Java version
java -version

# Check Maven version
mvn -version

# Check Docker version
docker --version

# Check running containers
docker ps

# Check all containers
docker ps -a

# Check Docker logs
docker logs spring-app

# Check application logs inside container
docker exec spring-app cat /app/logs/application.log

# Check container resource usage
docker stats spring-app

# Inspect container details
docker inspect spring-app
```

## Cleanup Commands

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove all unused resources
docker system prune

# Remove everything (use with caution!)
docker system prune -a --volumes

# Maven clean
mvn clean

# Remove target directory
rm -rf target/
```
