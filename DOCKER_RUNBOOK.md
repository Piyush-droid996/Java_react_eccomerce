
EAZYSTORE DOCKER & DEVELOPMENT RUNBOOK
======================================

1. PROJECT STRUCTURE
--------------------
Java_react_eccomerce/
├── Eazy_Store/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .env
│   └── Spring Boot Backend
└── frontend/
    ├── Dockerfile
    └── React App

2. ONE-TIME SETUP
-----------------
Install:
- Docker Desktop
- Java 21
- Maven
- Node.js
- Git

Verify:
java -version
mvn --version
docker --version
docker compose version

3. DAILY WORKFLOW
-----------------
A) Backend changes
1. cd Eazy_Store
2. mvn clean package -DskipTests
3. docker compose build backend
4. docker compose up -d backend

B) Frontend changes
1. cd frontend
2. npm run build (optional check)
3. cd ../Eazy_Store
4. docker compose build frontend
5. docker compose up -d frontend

C) Backend + Frontend changes
1. cd Eazy_Store
2. mvn clean package -DskipTests
3. docker compose build
4. docker compose up -d

4. START / STOP
---------------
Start:
docker compose up -d

Stop:
docker compose down

Status:
docker ps

Logs:
docker compose logs -f
docker logs eazystore-backend
docker logs eazystore-frontend
docker logs mysql-db

5. DATABASE
-----------
Persistent volume:
eazy_store_mysql-data

Check:
docker volume ls

DO NOT delete:
docker volume rm eazy_store_mysql-data

unless intentionally resetting database.

6. FRESH REBUILD
----------------
docker compose down
mvn clean package -DskipTests
docker compose build --no-cache
docker compose up -d

7. COMPLETE RESET (Deletes DB)
------------------------------
docker compose down -v

8. GIT WORKFLOW
---------------
git checkout -b feature/feature-name
git status
git add .
git commit -m "Meaningful message"
git push -u origin feature/feature-name

Create Pull Request -> Merge into main.

9. TROUBLESHOOTING
------------------
Issue: CORS
Cause:
- Backend jar not rebuilt.
Fix:
mvn clean package -DskipTests
docker compose build backend
docker compose up -d backend

Issue: Frontend changes not visible
Fix:
docker compose build frontend
docker compose up -d frontend

Issue: Backend changes not visible
Fix:
Forgot to rebuild jar.

Issue: Port 3306 already in use
Check:
netstat -ano | findstr :3306
tasklist /FI "PID eq <PID>"

If Windows MySQL service running:
Open CMD as Administrator
net stop MySQL80

Issue: JAVA_HOME not found
Set JAVA_HOME to:
C:\Program Files\Java\jdk-21.0.10

Issue: Docker compose says 'no configuration file provided'
Run command inside Eazy_Store folder.

Issue: Communication link failure
Usually:
- MySQL not running
- Wrong datasource URL
- Wrong password
- Container not started

Check:
docker ps
docker compose logs backend

Issue: Docker container exits
Check:
docker logs <container-name>

10. PROJECT FILES
-----------------
Never commit:
.env
target/
node_modules/
dist/

Commit:
Source code
Dockerfile
docker-compose.yml
README.md
.gitignore

11. REMEMBER
------------
- Build Spring Boot JAR before rebuilding backend image.
- Frontend image must be rebuilt after UI changes.
- Docker volume keeps database safe.
- Containers are temporary.
- Images can be recreated anytime.
- Volume contains your data.

12. QUICK COMMANDS
------------------
Start:
docker compose up -d

Stop:
docker compose down

Backend rebuild:
mvn clean package -DskipTests
docker compose build backend
docker compose up -d backend

Frontend rebuild:
docker compose build frontend
docker compose up -d frontend

Everything:
mvn clean package -DskipTests
docker compose build
docker compose up -d
