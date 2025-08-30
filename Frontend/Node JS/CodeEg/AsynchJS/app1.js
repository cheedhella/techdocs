/*
    Asynchronous JavaScript
        JavaScript is Synchrounous - It means it is a single-threaded programming language, each line is executed 
            after the line before, regardless of how long it will take;
        NodeJS is Asynchronous - You can do long IO/network requests parallely, without blocking the main thread;
            It supports callbacks, promises and async/await;
            
    Non-Blocking IO
        All of the I/O methods in the Node.js standard library provide asynchronous versions, which are 
        non-blocking and accept callback functions;
*/

console.log('Starting...');
setTimeout(() => {
    console.log('After 2 seconds...')
}, 2000);   // Node awaits and calls the callback after 2 seconds!
console.log('Stopping...');

/*
> node app1.js
Starting...
Stopping...
After 2 seconds...
*/