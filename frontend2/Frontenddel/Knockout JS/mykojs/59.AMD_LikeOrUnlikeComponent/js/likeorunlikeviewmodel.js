define(['knockout', 'textplugin!../likeorunliketemplate.htm'], function (ko, likeOrUnlikeTemplate) {
    function(params) {
        this.chosenValue = params.value; // can be either null, 'like', or 'dislike'
        this.like = function() { this.chosenValue('like'); }.bind(this);
        this.dislike = function() { this.chosenValue('dislike'); }.bind(this);
    }
    return { viewModel: likeorunlikeviewmodel, template: likeOrUnlikeTemplate };
});
