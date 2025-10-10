/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg1
	tsc -out _compiled/app.js m1.ts App3.ts --module amd
*/

import { greeting } from "./m1"

alert('greeting: ' + greeting);
