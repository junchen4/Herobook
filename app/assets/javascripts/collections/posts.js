Herobook.Collections.Posts = Backbone.Collection.extend({
  url: '/posts',

  model: Herobook.Models.Post,

  comparator: function(model) {
    return -model.get('myDate');
  },

  initialize: function(models, options) {
    // this.user = options.user;
  },

  getOrFetch: function(id) {
      var post = this.get(id)

      if(!post) {
        post = new Herobook.Models.post({id: id});
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

Herobook.Collections.posts = new Herobook.Collections.Posts()