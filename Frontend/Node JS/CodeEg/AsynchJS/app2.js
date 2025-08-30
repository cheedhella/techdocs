console.log('Starting...');
setTimeout(() => {
    console.log('After 0 seconds...'); // It is executed after after 'Stopping'
}, 0);
console.log('Stopping...');

/*
Output:
> node app2.js 
Starting...
Stopping...
After 0 seconds...
*/

/*
How asynch js is executed by v8 JS engine?
    Callstack -> It's job is to track the execution of our program;
    Node APIs -> 
        setTimeout() is not JS, it is a node JS API implemented in C++;
        It actually registers an event and callback with Node API;
    Callback Queue
        It maintains a list of handlers that are ready to be executed;
        When an even registered with Node API occurs, handler is added to the callback queue;
        But, before executing a handler, it should be added to Callstack;
        This is where Event Loop comes into picture;
    Event Loop
        It looks at the CallStack. 
        If it is empty, then it picks from Callback Queue;
        If it is not empty, handlers will wait in the Callback Queue until CallStack is empty;
        
https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff
*/