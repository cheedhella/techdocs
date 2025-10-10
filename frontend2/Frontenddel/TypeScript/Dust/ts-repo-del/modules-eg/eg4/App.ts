/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg4
	tsc -out _compiled/app.js IPoint.ts Point.ts App.ts --module amd
*/

import { IPoint, Point } from "./Point" 	// Rather than importing IPoint from Ipoint.ts, you can also import it from Point.ts;

let pt: IPoint = new Point(3, 4);
alert(pt.distanceFromOrigin());