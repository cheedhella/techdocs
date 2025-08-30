// It returns an object with modulename property and sayHi method;
define([], function() {
    return {
        modulename: 'hello-2',
        sayHi: function() {
           return "Hi from sayHi()";
        }
    };
});