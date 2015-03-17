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
    'users/:id': 'show'
  },

  show: function(id) {
    var user = FacebookApp.Collections.users.getOrFetch(id);
    console.log("shown user is:  " + user.get('id'));
    var userShowView = new FacebookApp.Views.UserShow({model: user});
    this._swapView(userShowView);
  },

  // _getUser: function (id, callback) {
  //   var that = this;
  //   var user = .posts.get(id);
  //   if (!post) {
  //     post = new PostApp.Models.Post({
  //       id: id
  //     });
  //     post.collection = this.posts;
  //     post.fetch({
  //       success: function () {
  //         that.posts.add(post);
  //         callback(post);
  //       }
  //     });
  //   } else {
  //     callback(post);
  //   }
  // },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})
