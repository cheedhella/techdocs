var ns1;
(function (ns1) {
    ns1.foo = 123;
})(ns1 || (ns1 = {}));
var ns2;
(function (ns2) {
    ns2.foo = 456;
    var bar = 345;
})(ns2 || (ns2 = {}));
/*
Steps to Compile:
    cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg2
    tsc -out _compiled/app.js App2.ts ns1.ts ns2.ts
*/
/// <reference path = "ns1.ts" />
/// <reference path = "ns2.ts" />
console.log('ns1.foo: ' + ns1.foo);
console.log('ns2.foo: ' + ns2.foo);
console.log('ns2.bar: ' + ns2.bar);
