define(['jquery', 'knockout'], function ($, ko)
{
   ko.components.register('usersignupform', {
        require: 'js/likeorunlikeviewmodel'
    });
    ko.applyBindings();
});
