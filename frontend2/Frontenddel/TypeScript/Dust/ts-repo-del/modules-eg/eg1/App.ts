/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg1
	
	tsc -out _compiled/app.js m1.ts App.ts 
	// TODO: What is below error?
	// Compiler Error: Cannot compile modules using option 'out' unless the '--module' flag is 'amd' or 'system'.

	tsc -out _compiled/app.js m1.ts App.ts --module amd
*/

// console.log('greeting: ' + greeting); // Error: cannot find 'greeting'
