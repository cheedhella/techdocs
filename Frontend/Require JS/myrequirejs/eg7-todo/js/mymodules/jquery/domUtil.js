define(['jquery', './util/calculator'], function ($, mc) {
    var domUtil = {};

    domUtil.updateHTML = function () {
        $('body').html(mc.getSum());
    };

    return domUtil;
});