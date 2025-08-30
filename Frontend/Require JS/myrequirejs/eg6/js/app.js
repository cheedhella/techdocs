/*
require.config({
	baseUrl: 'js/mymodules',
	paths: {
		jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min', // No JS extension!
		myJqueryUtil: 'jquery/domUtil',
		myCalculator: 'util/calculator',
		myRandom: 'util/random'
	}
});

require(["myRandom", "myCalculator", "myJqueryUtil"], function (mr, mc, ju) {
	let num1 = mr();
	let num2 = mr();
	let sum = mc.add(num1, num2);
	ju.updateHTML(num1 + ' + ' + num2 + ' = ' + sum);
});
*/

require.config({
	baseUrl: 'js/mymodules',
	paths: {
		jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min', // No JS extension!
		myJqueryUtil: 'jquery/domUtil',
		myUtil: 'util'
	}
});

require(["myUtil/random", "myUtil/calculator", "myJqueryUtil"], function (mr, mc, ju) {
	let num1 = mr();
	let num2 = mr();
	let sum = mc.add(num1, num2);
	ju.updateHTML(num1 + ' + ' + num2 + ' = ' + sum);
});