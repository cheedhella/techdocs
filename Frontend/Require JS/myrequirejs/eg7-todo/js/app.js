require.config({
	baseUrl: 'js/mymodules',
	paths: {
		jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min', // No JS extension!
		myJqueryUtil: 'jquery/domUtil'
	}
});

require(["myJqueryUtil"], function(ju) {
	ju.updateHTML();
});