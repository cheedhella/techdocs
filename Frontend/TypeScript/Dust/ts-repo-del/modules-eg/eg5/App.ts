/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg5
	tsc -out _compiled/app.js IPoint.ts Point.ts App.ts --module amd
*/

import { IPoint } from "./IPoint"
import Point from "./Point" 		// Default export is imported without curly braces;

let pt: IPoint = new Point(3, 4);
alert(pt.distanceFromOrigin());