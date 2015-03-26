FacebookApp.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  posts: function() {
    if(!this._posts) {
      this._posts = new FacebookApp.Collections.Posts([], {user: this});
    }
    return this._posts;
  },

  comments: function() {
    if(!this._comments) {
      this._comments = new FacebookApp.Collections.Comments([], {user: this});
    }
    return this._comments;
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

  likes: function() {
    if(!this._likes) {
      this._likes = new FacebookApp.Collections.Likes([], {user: this});
    }
    return this._likes;
  },

  newsfeedPosts: function() {
    if(!this._newsfeedPosts) {
      this._newsfeedPosts = new FacebookApp.Collections.Posts([], {user: this});
    }
    return this._newsfeedPosts;
  },

  newsfeedComments: function() {
    if(!this._newsfeedComments) {
      this._newsfeedComments = new FacebookApp.Collections.Comments([], {user: this});
    }
    return this._newsfeedComments;
  },

///////////////////////////

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

    if(response.likes) {
      this.likes().set(response.likes, {parse: true});
      delete response.likes;
    }

    if(response.comments) {
      this.comments().set(response.comments, {parse: true});
      delete response.comments;
    }

    if(response.newsfeedPosts) {
      this.newsfeedPosts().set(response.newsfeedPosts, {parse: true});
      delete response.newsfeedPosts;
    }

    if(response.newsfeedComments) {
      this.newsfeedComments().set(response.newsfeedComments, {parse: true});
      delete response.newsfeedComments;
    }

    return response;
  }


})
