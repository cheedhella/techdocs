define(['jquery'], function ($) {
    var domUtil = {};

    domUtil.updateHTML = function (arg) {
        $('body').html(arg);
    };

    return domUtil;
});