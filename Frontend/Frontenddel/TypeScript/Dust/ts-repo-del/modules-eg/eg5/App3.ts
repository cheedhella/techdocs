/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg5
	tsc -out _compiled/app.js IPoint.ts Point.ts App.ts --module amd
*/

import { IPoint } from "./IPoint"
import { default as DefPoint } from "./Point" 		// Another way of importing default export!

let pt: IPoint = new DefPoint(3, 4);
alert(pt.distanceFromOrigin());