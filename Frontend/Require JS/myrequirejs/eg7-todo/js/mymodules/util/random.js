// define a module returning function - which returns a random int b/w 1 and 100;
define(function () {
   function getRandom() {
      return Math.random() * 100;
   }
   return getRandom;
});
