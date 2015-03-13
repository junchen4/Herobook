FacebookApp.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  posts: function() {
    if(!this._posts) {
      this._posts = new FacebookApp.Collections.Posts([], {user: this});
    }
    return this._posts;
  },

  requests: function() {
    if(!this._requests) {
      this._requests = new FacebookApp.Collections.Requests([], {user: this});
    }
    return this._requests;
  },

  parse: function(response) {
    if(response.posts) {
      this.posts().set(response.posts, {parse: true});
      delete response.posts;
    }

    if(response.requests) {
      this.requests().set(response.requests, {parse: true});
      delete response.requests;
    }

    return response;
  }


})
