Herobook.Collections.NewsfeedItems = Backbone.Collection.extend({
  
  model: Herobook.Models.NewsfeedItem,

  initialize: function(models, options) {
    this.user = options.user;
  },

  comparator: function(model) {
    return model.get('myDate');
  }


})
