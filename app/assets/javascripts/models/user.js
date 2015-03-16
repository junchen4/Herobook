FacebookApp.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  posts: function() {
    if(!this._posts) {
      this._posts = new FacebookApp.Collections.Posts([], {user: this});
    }
    // var that = this;
    // this._posts.fetch({
    //   success: function() {
    //     // console.log(that._posts)
    //     that._posts = that._posts.where({author_id: 1});
    //     // console.log(that._posts[0]);
    //   }
    // });
    return this._posts;
  },

  requests: function() {
    if(!this._requests) {
      this._requests = new FacebookApp.Collections.Requests([], {user: this});
    }
    return this._requests;
  },

  parse: function(response) {
    if(response.authoredPosts) {
      this.posts().set(response.authoredPosts, {parse: true});
      delete response.authoredPosts;
    }

    if(response.receivedPosts) {
      this.posts().set(response.receivedPosts, {remove: false, parse: true});
      delete response.receivedPosts;
    }

    if(response.requests) {
      this.requests().set(response.requests, {parse: true});
      delete response.requests;
    }

    return response;
  }


})
