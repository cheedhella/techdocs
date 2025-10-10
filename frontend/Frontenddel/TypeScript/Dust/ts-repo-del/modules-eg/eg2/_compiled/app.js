define("IPoint", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("Point", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.distanceFromOrigin = function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        };
        return Point;
    }());
    exports.Point = Point;
});
/*
Steps to Compile:
    cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg2
    tsc -out _compiled/app.js IPoint.ts Point.ts App.ts --module amd
*/
define("App", ["require", "exports", "Point"], function (require, exports, Point_1) {
    "use strict";
    exports.__esModule = true;
    var pt = new Point_1.Point(1, 2);
    alert(pt.distanceFromOrigin());
});
