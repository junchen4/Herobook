Herobook.Collections.Requests = Backbone.Collection.extend({
  url: '/requests',

  model: Herobook.Models.Request,

  initialize: function(models, options) {
    this.user = options.user;
  },

  getOrFetch: function(id) {
      var request = this.get(id)

      if(!request) {
        request = new Herobook.Models.Request({id: id});
        var collections = this;
        request.fetch({
          success: function() {
            collections.add(request);
          }
        })
      }
      else {
        request.fetch();
      }
      return request;
  }
})
