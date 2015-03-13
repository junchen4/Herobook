FacebookApp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
    FacebookApp.Collections.users.fetch();
  },

  routes: {
    'users/:id': 'show'
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
