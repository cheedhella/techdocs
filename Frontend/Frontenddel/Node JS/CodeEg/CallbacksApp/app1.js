/*
Callback Function
    A function which we provided as an argument to another function with the intention to call later on;
*/

setTimeout(() => {
    console.log('2 seconds are up...');
}, 2000);

/*
In above example, callback passed to setTimeout() is invoked asynchronously;
It doesn't mean that all callbacks are invoked asynchronously;
Array methods such as foreach, filter accepts callback function, they are synchronous;
*/

const names = ['Andrew', 'Jen', 'Jess'];
const shortNames = names.filter((name) => {
    return name.length < 4; // length of name less than 4 chars;
});
console.log(shortNames);


/* 
Callback passed to the setTimeout is executed after main function exits. 
So, it can't return any data to the caller.
*/

// it works!
const getGeoCodes = (address, callback) => {
    return {
        latitude: 0,
        longitude: 0
    };
}
const data = getGeoCodes('Philadelphia');
console.log(data);

// it doesn't work
const data2 = setTimeout(() => {
    return {
        latitude: 0,
        longitude: 0
    };
}, 1000);
console.log(data2);

const getGeoCodes2 = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };
        callback(data);
    });
}
getGeoCodes2('Philadelphia', (data) => {
    console.log(data);
});

/* So far, callbacks are not defined(one time use only). You can also define them, so that they can be reused. */
