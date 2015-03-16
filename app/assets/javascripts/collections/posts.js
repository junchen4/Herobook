FacebookApp.Collections.Posts = Backbone.Collection.extend({
  url: '/posts',

  model: FacebookApp.Models.Post,

  initialize: function(models, options) {
    this.user = options.user;
   
  },

  getOrFetch: function(id) {
      var post = this.get(id)

      if(!post) {
        post = new FacebookApp.Models.post({id: id});
        var collections = this;
        post.fetch({
          success: function() {
            collections.add(post);
          }
        })
      }
      else {
        post.fetch();
      }
      return post;
  }
})

