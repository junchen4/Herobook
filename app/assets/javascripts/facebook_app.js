window.FacebookApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new FacebookApp.Routers.Router({$rootEl: $('#content')});
    FacebookApp.Models.currentUser.fetch({
    	success: function () {
   			Backbone.history.start();
    	}
    });
  }
}


