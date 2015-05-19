window.Herobook = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Herobook.Routers.Router({$rootEl: $('#content')});
    Herobook.Models.currentUser.fetch({
    	success: function () {
   			Backbone.history.start();
    	}
    });
  }
}


