FacebookApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    FacebookApp.Collections.users.fetch(); //what if this doesn't fetch users on time?
    FacebookApp.Models.currentUser = new FacebookApp.Models.CurrentUser();
    FacebookApp.Models.currentUser.fetch({
      success: function() {
        console.log("current user", FacebookApp.Models.currentUser);
        console.log("current user's ID is:  " + FacebookApp.Models.currentUser.get('id'));
      }
    });
    console.log("router initialized");
  },

  routes: {
    'newsfeed': 'newsFeed',
    'users/:id': 'show',
    'users/:id/info': 'info'
  },

  newsFeed: function() {
    var userFeedView = new FacebookApp.Views.NewsFeedShow({model: FacebookApp.Models.currentUser});
    this._swapView(userFeedView);
  },

  show: function(id) {
    var that = this;
    //setTimeout() allows for current user to fetch completely.
    //Look into more effective way of writing this
    window.setTimeout(function() {
      console.log(FacebookApp.Models.currentUser.get('id') == id); //Must use double = here, not triple =
      if(FacebookApp.Models.currentUser.get('id') == id) {
        var userShowView = new FacebookApp.Views.UserShow({model: FacebookApp.Models.currentUser});
      }
      else {
        var userShowView = new FacebookApp.Views.UserShow({model: FacebookApp.Collections.users.getOrFetch(id)});
      }
      that._swapView(userShowView);
    }, 150);
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
