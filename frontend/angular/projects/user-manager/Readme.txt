How to run locally

Start backend
In folder backend, run:
.\mvnw.cmd spring-boot:run
Start frontend
In folder frontend, run:
npm start
Open app
http://localhost:4200
Backend API is on http://localhost:8082/api/users
If you want, I can also add server-side validation (age range, required fields) and a small search/filter bar in the Angular table.





So your setup is: 8.0.45-0ubuntu0.24.04.1   MySQL Community Edition packaged by Ubuntu.

Product: MySQL Server
Edition: Community Edition
Packaging: Ubuntu 24.04 repository build
Version: 8.0.45

You are not running:

MySQL Enterprise
Percona Server
MariaDB


Most MySQL 8 installations on Ubuntu use:

InnoDB for transactional tables
ACID compliance
Row-level locking
Crash recovery

MyISAM is no longer the default in MySQL 8.

3	21	20:39:36	CREATE TABLE users (
     id BIGINT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     age INT,
     gender ENUM('MALE', 'FEMALE', 'OTHER')
 ) ENGINE=InnoDB	0 row(s) affected	1.110 sec

npm config set registry https://npmjs-proxy.artifacts.cadence.com/
npm install @angular/cli@17.3.9

export HTTPS_PROXY=https://npmjs-proxy.artifacts.cadence.com/


npm install -g ./cli-17.3.9.tgz --registry=https://registry.npmjs.org/
