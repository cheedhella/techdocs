require.config({
	baseUrl: 'js/mymodules',
	paths: {
		jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min', // No JS extension!
		myCalculator: 'calculator',
		myRandom: 'random'
	}
});

require(["jquery"], function ($) {
	// At this moment only JQuery is loaded!
	$('#btn1').click(function() {
		require(['myRandom'], function(mr) { // Other scripts are loaded, when you click on the button!
			$('#myresult').text(mr());
		});
	});
});