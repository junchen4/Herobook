FacebookApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    FacebookApp.Collections.users.fetch(); 
    FacebookApp.Models.currentUser = new FacebookApp.Models.CurrentUser();
  },

  routes: {
    '': 'feed',
    'feed': 'feed',
    'users/:id': 'show',
    'users/:id/info': 'info'
  },

  feed: function() {
    var currentUser = FacebookApp.Collections.users.getOrFetch(FacebookApp.Models.currentUser.get('id'));
    FacebookApp.Models.feed.fetch();
    var userFeedView = new FacebookApp.Views.FeedShow({model: FacebookApp.Models.feed, user: currentUser});
    this._swapView(userFeedView);
  },

  show: function(id) {
    var user = FacebookApp.Collections.users.getOrFetch(id);
    FacebookApp.Collections.posts.fetch({data: {user_id: id}});
    var userShowView = new FacebookApp.Views.UserShow({model: user, feed: FacebookApp.Models.feed, posts: FacebookApp.Collections.posts});
    this._swapView(userShowView);   
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
