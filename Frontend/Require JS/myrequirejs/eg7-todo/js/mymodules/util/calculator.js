define(["./random"], function (r) {
    var calculator = {};
    
    calculator.getSum = function() {
        return r() + r();
    };

    return calculator;
}) ;