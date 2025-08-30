require.config({
	baseUrl: 'js/mymodules',
	paths: {
		jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min', // No JS extension!
		myCalculator: 'calculator',
		myRandom: 'random'
	}
});

require(["myRandom", "jquery"], function (mr, $) {
	$('#btn1').click(function() {
		$('#myresult').text(mr());
	});
});