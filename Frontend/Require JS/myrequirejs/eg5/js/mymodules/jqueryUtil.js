define(['jquery'], function ($) {
    var methods = {};

    methods.updateHTML = function (arg) {
        $('body').html(arg);
    };

    return methods;
});