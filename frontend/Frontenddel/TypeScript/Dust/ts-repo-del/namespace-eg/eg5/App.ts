/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg4
	tsc -out _compiled/app.js App.ts ns1.ts ns2.ts
*/

/// <reference path = "ns1.ts" />
/// <reference path = "ns2.ts" />

console.log('myns.foo: ' + myns.foo); 	// myns.foo: 123
console.log('myns.bar: ' + myns.bar); 	// myns.bar: 124