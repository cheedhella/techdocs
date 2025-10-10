define(['jquery', 'knockout'], function ($, ko)
{
   ko.components.register('usersignup', {
        require: './usersignup'
    });
    ko.applyBindings();
});