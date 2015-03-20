FacebookApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    FacebookApp.Collections.users.fetch(); //what if this doesn't fetch users on time?
    FacebookApp.Models.currentUser = new FacebookApp.Models.CurrentUser();
    FacebookApp.Models.currentUser.fetch({
      success: function() {
        console.log("current user's ID is:  " + FacebookApp.Models.currentUser.get('id'));
      }
    });
    console.log("router initialized");
  },

  routes: {
    'newsfeed': 'newsFeed',
    'users/:id': 'show'
  },

  newsFeed: function() {
    var userFeedView = new FacebookApp.Views.NewsFeedShow({model: FacebookApp.Models.currentUser});
    this._swapView(userFeedView);
  },

  show: function(id) {
    var user = FacebookApp.Collections.users.getOrFetch(id);
    var userShowView = new FacebookApp.Views.UserShow({model: user});
    this._swapView(userShowView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})
