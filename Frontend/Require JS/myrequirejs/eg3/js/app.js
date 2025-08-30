// RequireJS looks for hello-1 and hello-2 modules in the folder same as that of app.js;
require(["hello-1", "hello-2"], function(h1, h2) { 
	console.log('Module Name: ' + h1.modulename + ', message: ' + h1.message);
	console.log('Module Name: ' + h2.modulename + ', message: ' + h2.sayHi());
});