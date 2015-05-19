Herobook.Models.Feed = Backbone.Model.extend({
  urlRoot: "/feeds/new",

  feedPosts: function() {
    if(!this._feedPosts) {
      this._feedPosts = new Herobook.Collections.Posts([], {user: this});
    }
    return this._feedPosts;
  },

  feedAcceptances: function () {
    if(!this._feedAcceptances) {
      this._feedAcceptances = new Herobook.Collections.Requests([], {user: this});
    }
    return this._feedAcceptances;
  },

/////////////

  parse: function(response) {
    if(response.feedPosts) {
      this.feedPosts().set(response.feedPosts, {parse: true});
      delete response.feedPosts;
    }

    if(response.feedAcceptances) {
      this.feedAcceptances().set(response.feedAcceptances, {parse: true});
      delete response.feedAcceptances;
    }

    return response;
  }


})

Herobook.Models.feed = new Herobook.Models.Feed();