/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/namespace-eg/eg1
	tsc App.ts -out _compiled/app.js 
*/

namespace ns1 {
	export const foo = 123;
}

namespace ns2 {
	const bar = 345;
	export const foo = bar;
}

console.log('ns1.foo: ' + ns1.foo); 	// 123
console.log('ns2.foo: ' + ns2.foo); 	// 345
// console.log('ns2.bar: ' + ns2.bar); // Compiler Error: Property 'bar' does not exist on type 'typeof ns2'