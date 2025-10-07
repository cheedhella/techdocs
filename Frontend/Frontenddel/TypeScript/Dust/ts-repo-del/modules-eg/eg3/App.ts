/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg2
	tsc -out _compiled/app.js IPoint.ts Point.ts App.ts AllExports.ts --module amd
*/

import * as MyImports from "./AllExports"

let pt: MyImports.IPointInterface = new MyImports.PointClass(3, 4);
alert(pt.distanceFromOrigin());