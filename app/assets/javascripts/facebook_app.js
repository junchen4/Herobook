window.FacebookApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new FacebookApp.Routers.Router({$rootEl: $('#content')});
    Backbone.history.start();
  }
}

$(document).ready(function() {
  FacebookApp.initialize();
})
