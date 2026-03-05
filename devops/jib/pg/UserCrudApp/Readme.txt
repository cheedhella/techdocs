To Compile, create and push docker image:
    # Step 1: Set environment variables 
    export DOCKER_USERNAME=cheedhella
    export DOCKER_PASSWORD=<your-access-token>

    # Step 2: Jib is configured to build and push to docker.io/cheedhella/user-crud-app with tags latest and 1.0-SNAPSHOT
    # To build and push the image:
    mvn compile jib:build


# Built and pushed image as cheedhella/user-crud-app, cheedhella/user-crud-app:1.0-SNAPSHOT, cheedhella/user-crud-app

# Or build to local Docker daemon (no auth needed)
mvn compile jib:dockerBuild

Method	Path	Description
GET	/api/users	List all users
GET	/api/users/{id}	Get user by ID
POST	/api/users	Create user (auto-generates ID)
PUT	/api/users/{id}	Update user
DELETE	/api/users/{id}	Delete user

