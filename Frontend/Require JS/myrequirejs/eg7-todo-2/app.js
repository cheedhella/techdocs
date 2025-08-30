require.config({
  baseUrl: 'js',
  paths: {
    myGreeter: 'greeter',
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min', // No JS extension!
		myJqueryUtil: 'domUtil'
  }
});

// it looks for greeter.js relative to the current module location;
define(["myGreeter"], function (greeter) {
  greeter.sayHello("Daniel");
});
