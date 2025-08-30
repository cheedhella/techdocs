/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg1
	tsc -out _compiled/app.js m1.ts App2.ts --module amd
*/

import { greeting } from "./m1"

console.log('greeting: ' + greeting); // Error: 'define' is not defined!

// https://stackoverflow.com/questions/34675659/define-is-not-defined-in-nodejs-typescript-app
// Solution: RequireJS is needed!

