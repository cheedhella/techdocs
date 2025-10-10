/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg2
	tsc ns1.ts ns2.ts App.ts -out _compiled/app.js
*/

console.log('ns1.foo: ' + ns1.foo); // TypeError: Cannot read property 'foo' of undefined
