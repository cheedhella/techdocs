/*
Steps to Compile:
	cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg2
	tsc
*/

// Imports can also be renamed.

import { IPointClass as IPoint } from "./AllExports"
import { PointClass as Point } from "./AllExports"

let pt: IPoint = new Point(3, 4);
alert(pt.distanceFromOrigin());