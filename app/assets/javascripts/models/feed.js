FacebookApp.Models.Feed = Backbone.Model.extend({
  urlRoot: "/feeds/new",

  feedPosts: function() {
    if(!this._feedPosts) {
      this._feedPosts = new FacebookApp.Collections.Posts([], {user: this});
    }
    return this._feedPosts;
  },

  feedCommentedPosts: function() {
    if(!this._feedCommentedPosts) {
      this._feedCommentedPosts = new FacebookApp.Collections.Posts([], {user: this});
    }
    return this._feedCommentedPosts;
  },

  feedAcceptances: function () {
    if(!this._feedAcceptances) {
      this._feedAcceptances = new FacebookApp.Collections.Requests([], {user: this});
    }
    return this._feedAcceptances;
  },

/////////////

  parse: function(response) {
    if(response.feedPosts) {
      this.feedPosts().set(response.feedPosts, {parse: true});
      delete response.feedPosts;
    }

    if(response.feedCommentedPosts) {
      this.feedCommentedPosts().set(response.feedCommentedPosts, {parse: true});
      delete response.feedCommentedPosts;
    }

    if(response.feedAcceptances) {
      this.feedAcceptances().set(response.feedAcceptances, {parse: true});
      delete response.feedAcceptances;
    }

    return response;
  }


})
