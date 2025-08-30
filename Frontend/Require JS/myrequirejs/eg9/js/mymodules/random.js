// define a module returning function - which returns a random int b/w 1 and 100;
// define a module returning function - which returns a random int b/w 1 and 100;
define(['myCalculator'], function(myCalculator) {
	function getRandom() {
		return parseInt(myCalculator.multiply(Math.random(), 100));
	}
	return getRandom;
});