/*
Steps to Compile:
    cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg1
    tsc -out _compiled/app.js App.ts
*/
var ns1;
(function (ns1) {
    ns1.foo = 123;
})(ns1 || (ns1 = {}));
var ns2;
(function (ns2) {
    var bar = 345;
    ns2.foo = bar;
})(ns2 || (ns2 = {}));
console.log('ns1.foo: ' + ns1.foo);
console.log('ns2.foo: ' + ns2.foo);
// console.log('ns2.bar: ' + ns2.bar); // Compiler Error: Property 'bar' does not exist on type 'typeof ns2'
