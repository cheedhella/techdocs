/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg2
	tsc App2.ts ns1.ts ns2.ts -out _compiled/app.js
*/

/// <reference path = "ns1.ts" />
/// <reference path = "ns2.ts" />

console.log('ns1.foo: ' + ns1.foo);
console.log('ns2.foo: ' + ns2.foo);
