require.config({
	baseUrl: 'js/mymodules',
	paths: {
		jquery: '../../../lib/jquery-3.4.1.min',
		myJqueryUtil: 'jqueryUtil'
	}
});

// If paths config is specified, baseUrl + paths config is used to resolve final URL!
require(["hello-1", "hello-2", "myJqueryUtil"], function (h1, h2, ju) {
	console.log('Module Name: ' + h1.modulename + ', message: ' + h1.message);
	console.log('Module Name: ' + h2.modulename + ', message: ' + h2.sayHi());
	ju.updateHTML('Hello!!');
});