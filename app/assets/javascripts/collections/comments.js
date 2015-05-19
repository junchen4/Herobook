Herobook.Collections.Comments = Backbone.Collection.extend({
  url: '/comments',

  model: Herobook.Models.Comment,

  initialize: function(models, options) {
    this.user = options.user;
    this.post = options.post;
  },

  getOrFetch: function(id) {
      var comment = this.get(id)

      if(!comment) {
        comment = new Herobook.Models.Comment({id: id});
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
