FacebookApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    FacebookApp.Collections.users.fetch(); //what if this doesn't fetch users on time?
    FacebookApp.Models.currentUser = new FacebookApp.Models.CurrentUser();
  },

  routes: {
    '': 'feed',
    'feed': 'feed',
    'users/:id': 'show',
    'users/:id/info': 'info'
  },

  feed: function() {
    var that = this;
    var currentUser = FacebookApp.Collections.users.getOrFetch(FacebookApp.Models.currentUser.get('id'));
    FacebookApp.Models.feed.fetch({
      success: function() {
            var userFeedView = new FacebookApp.Views.FeedShow({model: FacebookApp.Models.feed, user: currentUser});
            that._swapView(userFeedView);
            console.log("current user id", FacebookApp.Models.currentUser.get('id'));
            console.log("current user", FacebookApp.Models.currentUser);
      }
    });
  },

  show: function(id) {
    var that = this;
    var user = FacebookApp.Collections.users.getOrFetch(id);
    console.log("shown user", this.user);
    console.log("current user's ID is:  " + FacebookApp.Models.currentUser.get('id'));
		var userShowView = new FacebookApp.Views.UserShow({model: user, feed: FacebookApp.Models.feed});
		that._swapView(userShowView);
  },

  info: function(id) {
    var user = FacebookApp.Collections.users.getOrFetch(id);
    var userInfoView = new FacebookApp.Views.InfoShow({model: user});
    this._swapView(userInfoView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})
