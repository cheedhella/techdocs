define("m1", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.greeting = "Hello...!";
});
/*
Steps to Compile:
    cd /Users/mcheedhe/dev/git-repo/mytypescript/modules-eg/eg1
    tsc -out _compiled/app.js m1.ts App3.ts --module amd
*/
define("App3", ["require", "exports", "m1"], function (require, exports, m1_1) {
    "use strict";
    exports.__esModule = true;
    alert('greeting: ' + m1_1.greeting);
});
