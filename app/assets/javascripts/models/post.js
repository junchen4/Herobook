FacebookApp.Models.Post = Backbone.Model.extend({
  urlRoot: '/posts',

  comments: function() {
    if(!this._comments) {
      this._comments = new FacebookApp.Collections.Comments([], {user: this});
    }
    return this._comments;
  },

  parse: function(response) {
    console.log("response: ", response);
    if(response.comments) {
      this.comments().set(response.comments, {parse: true});
      delete response.comments;
    }

    return response;
  }

})
