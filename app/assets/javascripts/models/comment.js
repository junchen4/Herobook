Herobook.Models.Comment = Backbone.Model.extend({
  urlRoot: '/comments',

  likes: function() {
    if(!this._likes) {
      this._likes = new Herobook.Collections.Likes([], {comment: this});
    }
    return this._likes;
  },

  parse: function(response) {
    if(response.likes) {
      this.likes().set(response.likes, {parse: true});
      delete response.likes;
    }

    return response;
  }

})
