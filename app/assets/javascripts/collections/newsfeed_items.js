FacebookApp.Collections.NewsfeedItems = Backbone.Collection.extend({
  
  model: FacebookApp.Models.NewsfeedItem,

  initialize: function(models, options) {
    this.user = options.user;
  },

  comparator: function(model) {
    return model.get('myDate');
  }


})
