> node app.js
ReferenceError: name is not defined

Description: Each module is executed in it's own scope(it's own variables), unless you export them;