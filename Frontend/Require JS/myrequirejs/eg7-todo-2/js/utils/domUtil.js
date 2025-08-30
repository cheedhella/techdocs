define(['jquery'], function ($, mc) {
    var domUtil = {};

    domUtil.updateHTML = function (msg) {
        $('body').html(msg);
    };

    return domUtil;
});