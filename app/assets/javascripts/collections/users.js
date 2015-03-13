FacebookApp.Collections.Users = Backbone.Collection.extend({
  url: '/users',

  model: FacebookApp.Models.User,

  getOrFetch: function(id) {
      var user = this.get(id)

      if(!user) {
        user = new FacebookApp.Models.User({id: id});
        var collections = this;
        user.fetch({
          success: function() {
            collections.add(user);
          }
        })
      }
      else {
        user.fetch();
      }
      return user;
  }
})

FacebookApp.Collections.users = new FacebookApp.Collections.Users();
