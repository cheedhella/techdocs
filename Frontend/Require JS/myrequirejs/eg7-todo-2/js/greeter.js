// It looks for a file named utils/domUtil.js relative to current module location!
define(["./utils/domUtil"], function (dm) {
  var greeterObj = {};

  greeterObj.sayHello = function (msg) {
    dm.updateHTML('Hello ' + msg + '!\n');
  };

  return greeterObj;
});