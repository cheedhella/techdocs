define(['knockout', 'textplugin!../usersignupformtemplate.htm'], function (ko, userSignupFormTemplate) {
    function userSignupViewModel(params) {
        var self = this;
        self.firstname = ko.observable(params.firstname);
        self.lastname = ko.observable(params.lastname);
        self.fullname = ko.pureComputed(function () {
            return self.firstname() + " " + self.lastname()
        });
        self.email = ko.observable(params.email);
        self.password = ko.observable();
        return self;
    }
    return { viewModel: userSignupViewModel, template: userSignupFormTemplate };
});