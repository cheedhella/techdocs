/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg5
	tsc -out _compiled/app.js IPoint.ts Point.ts App.ts --module amd
*/

import Point = require("./Point");

let pt: Point = new Point(3, 4);
alert(pt.distanceFromOrigin());