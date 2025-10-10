var myns;
(function (myns) {
    myns.foo = 123;
})(myns || (myns = {}));
var myns;
(function (myns) {
    // export const foo = 456; // ERROR: Cannot redeclare block-scoped variable 'foo'
    myns.bar = myns.foo + 1;
})(myns || (myns = {}));
/*
Steps to Compile:
    cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg4
    tsc -out _compiled/app.js App.ts ns1.ts ns2.ts
*/
/// <reference path = "ns1.ts" />
/// <reference path = "ns2.ts" />
console.log('myns.foo: ' + myns.foo);
console.log('myns.bar: ' + myns.bar);
