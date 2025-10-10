define(['knockout', 'text!./usersignup.htm'], function (ko, usersignupTemplate) {
    function usersignup(params) {
        var self = this;
        self.firstname = ko.observable(params.firstname),
        self.lastname = ko.observable(params.lastname),
        self.email = ko.observable(params.email),
        self.password = ko.observable(),
        self.fullname = ko.pureComputed(function () {
            return self.firstname() + " " + self.lastname()
        })
        return self;
    }
    return { viewModel: usersignup, template: usersignupTemplate };
});