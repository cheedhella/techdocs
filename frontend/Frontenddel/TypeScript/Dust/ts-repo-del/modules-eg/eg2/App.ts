/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg2
	tsc -out _compiled/app.js IPoint.ts Point.ts App.ts --module amd
*/

import { IPoint } from "./IPoint"
import { Point } from "./Point" 		// importing Point doesn't import IPoint;

let pt: IPoint = new Point(1, 2);
alert(pt.distanceFromOrigin());