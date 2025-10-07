const myObj1 = {
    "a": "a",
    "b": {
        "c": "c",
        "d": {
            "e": "e",
            "f": {
                "g": "g",
                "h": {
                    "i": "i"
                }
            }
        }
    }
};

const myObj2 = {
    1: {
        2: {
            3: {
                4: {}
            }
        }
    }
};

console.log(myObj1); // { a: 'a', b: { c: 'c', d: { e: 'e', f: [Object] } } }
console.log(myObj2); // { '1': { '2': { '3': [Object] } } }


// Node formats console.log output with util.inspect, so deeply nested objects are replaced with [Object];
// What if you want to print the entire object?

// Option 1: With util.inspect, you can recurse through the entire object by setting the option depth to null;
const nodeUtil = require('util');
console.log(nodeUtil.inspect(myObj1, { depth: null }));
console.log(nodeUtil.inspect(myObj2, { depth: null }));

// Option 2: 
console.dir(myObj1, { depth: null });
console.dir(myObj2, { depth: null });

// https://blog.bitsrc.io/console-in-nodejs-ffbf547df843
// https://www.programminghunk.com/2020/04/nodejs-console.html

