FacebookApp.Collections.Likes = Backbone.Collection.extend({
  url: '/likes',

  model: FacebookApp.Models.Like,

  initialize: function(models, options) {
    this.user = options.user;
    this.post = options.post;
    this.comment = options.comment;
  },

  getOrFetch: function(id) {
      var like = this.get(id)

      if(!like) {
        like = new FacebookApp.Models.like({id: id});
        var collections = this;
        like.fetch({
          success: function() {
            collections.add(like);
          }
        })
      }
      else {
        like.fetch();
      }
      return like;
  }
})
