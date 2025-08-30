require.config({
	baseUrl: 'js/mymodules' 	// If baseUrl is explicitly set, directory containing data-main script is not used;
});

require(["hello-1", "hello-2"], function (h1, h2) {
	console.log('Module Name: ' + h1.modulename + ', message: ' + h1.message);
	console.log('Module Name: ' + h2.modulename + ', message: ' + h2.sayHi());
});