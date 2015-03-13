FacebookApp.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  posts: function() {
    if(!this._posts) {
      this._posts = new FacebookApp.Collections.Posts([], {user: this});
    }
    return this._posts;
  },

  parse: function(response) {
    if(response.posts) {
      this.posts().set(response.posts, {parse: true});
      delete response.posts;
    }

    return response;
  }


})
