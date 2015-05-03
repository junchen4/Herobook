FacebookApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    FacebookApp.Collections.users.fetch(); //what if this doesn't fetch users on time?
    FacebookApp.Models.currentUser = new FacebookApp.Models.CurrentUser();

    // FacebookApp.Models.currentUser.fetch({
    //   success: function() {
    //     console.log("current user", FacebookApp.Models.currentUser);
    //     console.log("current user's ID is:  " + FacebookApp.Models.currentUser.get('id'));
    //   }
    // });
  },

  routes: {
    '': 'feed',
    'feed': 'feed',
    'users/:id': 'show',
    'users/:id/info': 'info'
  },

  feed: function() {
    var that = this;
    FacebookApp.Models.feed.fetch({
      success: function() {
        // FacebookApp.Models.currentUser.fetch({
        //   success: function() {
            var userFeedView = new FacebookApp.Views.FeedShow({model: FacebookApp.Models.feed, user: FacebookApp.Models.currentUser});
            that._swapView(userFeedView);
            console.log("current user id", FacebookApp.Models.currentUser.get('id'));
            console.log("current user", FacebookApp.Models.currentUser);
      // }
    // })
      }
    });
  },

  show: function(id) {
    var that = this;
    FacebookApp.Models.currentUser.fetch({
      success: function() {
        console.log("current user", FacebookApp.Models.currentUser);
        console.log("current user's ID is:  " + FacebookApp.Models.currentUser.get('id'));

		    if(FacebookApp.Models.currentUser.get('id') == id) {
		      var userShowView = new FacebookApp.Views.UserShow({model: FacebookApp.Models.currentUser, feed: FacebookApp.Models.feed});
		    }
		    else {
		      var userShowView = new FacebookApp.Views.UserShow({model: FacebookApp.Collections.users.getOrFetch(id), feed: FacebookApp.Models.feed});
		    }
		    that._swapView(userShowView);
      }
    });
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
