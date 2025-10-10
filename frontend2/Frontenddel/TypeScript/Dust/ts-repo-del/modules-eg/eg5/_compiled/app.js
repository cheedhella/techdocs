define("IPoint", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
// Each module can have one default export;
// Default exports are imported using a different syntax;
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
    exports["default"] = Point;
});
/*
Steps to Compile:
    cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg5
    tsc -out _compiled/app.js IPoint.ts Point.ts App.ts --module amd
*/
define("App3", ["require", "exports", "Point"], function (require, exports, Point_1) {
    "use strict";
    exports.__esModule = true;
    var pt = new Point_1["default"](3, 4);
    alert(pt.distanceFromOrigin());
});
