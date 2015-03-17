FacebookApp.Collections.Comments = Backbone.Collection.extend({
  url: '/comments',

  model: FacebookApp.Models.Comment,

  initialize: function(models, options) {
    this.post = options.post;
  },

  getOrFetch: function(id) {
      var comment = this.get(id)

      if(!comment) {
        comment = new FacebookApp.Models.Comment({id: id});
        var collections = this;
        comment.fetch({
          success: function() {
            collections.add(comment);
          }
        })
      }
      else {
        comment.fetch();
      }
      return comment;
  }
})
