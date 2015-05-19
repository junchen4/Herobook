Herobook.Collections.Users = Backbone.Collection.extend({
  url: '/users',

  model: Herobook.Models.User,

  getOrFetch: function(id) {
      var user = this.get(id)
      if(!user) {
        user = new Herobook.Models.User({id: id});
        var collections = this;
        user.fetch({
          success: function () {
            console.log("fetched user", user);
            collections.add(user);
          }
        })
      }
      else {
        user.fetch({
          success: function () {
            console.log('fetched user', user);
          }
        });
      }
      return user;
  }
})

Herobook.Collections.users = new Herobook.Collections.Users();
