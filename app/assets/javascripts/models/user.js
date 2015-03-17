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

  friends: function() {
    if(!this._friends) {
      this._friends = new FacebookApp.Collections.Users([], {user: this});
    }
    return this._friends;
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

    if(response.incomingRequests) {
      this.requests().set(response.incomingRequests, {parse: true});
      delete response.incomingRequests;
    }

    if(response.outgoingRequests) {
      this.requests().set(response.outgoingRequests, {remove: false, parse: true});
      delete response.outgoingRequests;
    }

    if(response.allFriends) {
      this.friends().set(response.allFriends, {remove: false, parse: true});
      delete response.allFriends;
    }

    return response;
  }


})
