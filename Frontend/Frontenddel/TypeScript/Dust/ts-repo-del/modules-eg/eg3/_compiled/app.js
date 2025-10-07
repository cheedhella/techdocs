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
    exports.PointClass = Point;
});
define("AllExports", ["require", "exports", "Point"], function (require, exports, Point_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(Point_1);
});
/*
Steps to Compile:
    cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg2
    tsc -out _compiled/app.js IPoint.ts Point.ts App.ts AllExports.ts --module amd
*/
define("App", ["require", "exports", "AllExports"], function (require, exports, MyImports) {
    "use strict";
    exports.__esModule = true;
    var pt = new MyImports.PointClass(3, 4);
    alert(pt.distanceFromOrigin());
});
