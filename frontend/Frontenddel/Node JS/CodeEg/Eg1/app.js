const myFS = require('fs');

// 1st Arg - file name; 2nd Arg - content to write;
myFS.writeFileSync("output.txt", "Welcome!"); // If file doesn't exist, it creates a new one!
myFS.writeFileSync("output.txt", "Welcome 2!"); // If file already exists, it overwites the file contents!
myFS.appendFileSync("output.txt", " Text to append.."); // If file already exists, it appends the data!
