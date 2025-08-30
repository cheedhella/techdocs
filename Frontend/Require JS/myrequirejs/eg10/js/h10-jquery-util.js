define(['jquery'], function($) {
	var jutil = {};
	jutil.showMsg = function(arg) {
		$("b").text(arg);		
	};

	jutil.showAlert = function(arg) {
		alert(arg);
	};
	return jutil;
});
