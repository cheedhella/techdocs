const fs = require('fs');  
const out = fs.createWriteStream('./stdout.log'); 
const err = fs.createWriteStream('./stderr.log'); 
const myobject = new console.Console(out, err); 
  
// It will display 'This is the first example' to out 
myobject.log('This is the first example');
  
// It will display 'This is the second example' to out 
myobject.log('This is the %s example', 'second'); 
  
// It will display 'Error: In this we creating some error' to err 
myobject.error(new Error('In this we creating some error')); 
  
// It will display 'This is the third error' to err 
const num = 'third'; 
myobject.warn(`This is the ${num} example`); 


If you observe above example, we have created a simple object using Console class with configurable
 output streams and we have created a Console class object by using console.Console

Now, we will execute example_console_class.js script file in command prompt by navigating to the 
folder where it exists like as shown below.

The above node.js example will create a log files (stdout & stderr) in the folder where example_console_class.js 
file exists with required messages like as shown below.

Example of Global Console Object: Create a file and save it as example_console_object.js with the following code 
in the file.


// It will display 'This is the first object example' to stdout 
console.log('This is the first object example'); 
  
// It will display 'This is the second object example' to stdout 
console.log('This is the %s example', 'second object'); 
  
// It will display 'Error: New Error has happened' to stderr 
console.error(new Error('New Error has happened')); 
  
const obj = 'third object'; 
  
// It will display 'This is the third object example' to stderr 
console.warn(`This is the ${obj} example`); 

If you observe above code, we are trying to write a messages to node.js stream by using global console object methods such as console.log(), console.error() and console.warn(). Here, we are accessing global console object without importing it using require directive.

Now, we will execute example_console_object.js file, for that open a command prompt (cmd) and navigate to the folder that contains a example_console_object.js file and write the command node example_console_object.js and hit enter button like as shown below.

If you observe result, we are able to write a required messages to node.js stream by using global console object.

Console Methods: Apart from above three methods (console.log(), console.error(), console.warn()), few other methods also available in node.js console object to write or print a messages in node.js stream.

    console.count(): It is used to count the number of times a specific label has been called.
    console.clear(): It is used to clear the console history.
    console.info(): It is used to write a messages on console and it is an alias of console.log() method.
    console.time(): It is used to get the starting time of an action.
    console.timeEnd(): It is used to get the end time of specific action.
    console.dir(): It use util.inspect() on object and prints the resulting string to stdout.


