// This module depends on 2 modules: jquery, h10-jquery-util;
// Path of these modules resolved using config.js;
define(['jquery', 'h10-jquery-util'], function($, myutil) {
	$('#clickMe').click(function() {
		myutil.showMsg('Malli, Thanks for Clicking me');
	});
	$('#clickMe').dblclick(function() {
		myutil.showAlert('Welcome Malli...');
	});
});