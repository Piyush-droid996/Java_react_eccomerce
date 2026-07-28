
EAZYSTORE - DOCKER IMPLEMENTATION CHANGE LOG
============================================

This document records every important change made while Dockerizing the project.

1. BACKEND CHANGES
------------------

Files Changed:
- Eazy_Store/Dockerfile
- Eazy_Store/docker-compose.yml
- Eazy_Store/.env
- Eazy_Store/src/main/resources/application.properties
- Eazy_Store/src/main/java/.../config/CorsConfig.java
- Eazy_Store/src/main/java/.../config/SecurityConfig.java
- Controllers (CrossOrigin updates)

Changes:
✓ Created Dockerfile for Spring Boot
✓ Backend runs from packaged JAR
✓ Configured Docker Compose
✓ Connected backend to MySQL container
✓ Added environment variables
✓ Changed datasource host from localhost to mysql
✓ Fixed CORS issues
✓ Rebuilt JAR before Docker build

Dockerfile:
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]

--------------------------------------------------------

2. FRONTEND CHANGES
-------------------

Files Changed:
- frontend/Dockerfile

Changes:
✓ Multi-stage Docker build
✓ Node image used for build
✓ Nginx used to serve React build
✓ React available on port 3000

Build Flow:
Node -> npm install
Node -> npm run build
Copy dist -> nginx

--------------------------------------------------------

3. DOCKER COMPOSE
-----------------

Created:
docker-compose.yml

Services:
✓ mysql
✓ backend
✓ frontend

Added:
- Persistent Volume
- Port Mapping
- Environment Variables
- depends_on

Ports:
3306 -> MySQL
8080 -> Spring Boot
3000 -> React

--------------------------------------------------------

4. DATABASE
-----------

Implemented Docker Volume

mysql-data:/var/lib/mysql

Result:
✓ Database survives container deletion
✓ Data remains after docker compose down

Important:
docker compose down
    -> keeps database

docker compose down -v
    -> deletes database

--------------------------------------------------------

5. ENVIRONMENT VARIABLES
------------------------

Created:
.env

Variables:
MYSQL_ROOT_PASSWORD
MYSQL_DATABASE
MYSQL_PORT
BACKEND_PORT
FRONTEND_PORT

Compose uses:
${VARIABLE_NAME}

--------------------------------------------------------

6. APPLICATION.PROPERTIES
-------------------------

Changed datasource

Before:
jdbc:mysql://localhost:3306/eazystore

After:
jdbc:mysql://mysql:3306/eazystore

Reason:
Backend talks to Docker MySQL service.

--------------------------------------------------------

7. GIT
------

Added:
Dockerfile
docker-compose.yml

Ignored:
target/
node_modules/
dist/
.env

Created feature branch:
feature/docker-setup

--------------------------------------------------------

8. ISSUES FACED
---------------

1. CORS blocked requests
Reason:
Old backend JAR.
Fix:
Rebuild backend.

2. Docker not reflecting changes
Reason:
Forgot mvn package.
Fix:
mvn clean package -DskipTests

3. JAVA_HOME not configured
Fix:
Set JAVA_HOME to JDK 21.

4. Port 3306 busy
Reason:
Windows MySQL service.
Fix:
Stop service or free port.

5. Communication Link Failure
Reason:
MySQL unavailable or wrong datasource.

6. Docker compose 'no configuration file'
Reason:
Ran command outside Eazy_Store.

7. Lost data
Reason:
Volume misunderstanding.
Solution:
Keep mysql-data volume.

--------------------------------------------------------

9. FINAL ARCHITECTURE

React
  |
Nginx Container
  |
Spring Boot Container
  |
MySQL Container
  |
Docker Volume

--------------------------------------------------------

10. LESSONS LEARNED

✓ Build backend JAR first.
✓ Then rebuild Docker image.
✓ Frontend changes require frontend rebuild.
✓ Containers are temporary.
✓ Images are rebuildable.
✓ Volume stores database.
✓ .env should not be committed.
✓ Always test using docker compose up -d after changes.

End of Document
