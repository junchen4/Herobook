FacebookApp.Collections.Users = Backbone.Collection.extend({
  url: '/users',

  model: FacebookApp.Models.User,

  //Callback implemented specifically for RequestShow view to get the friend-requestor's model and update its friends
  //Otherwise, we only have access to the current user
  getOrFetch: function(id, callback) {
      var user = this.get(id)
      if(!user) {
        user = new FacebookApp.Models.User({id: id});
        var collections = this;
        user.fetch({
          success: function() {
            collections.add(user);
            if(callback) {
              callback(user);
            }
          }
        })
      }
      else {
        user.fetch({
          success: function() {
            if(callback) {
              callback(user);
            }
          }
        });
      }
      return user;
  }
})

FacebookApp.Collections.users = new FacebookApp.Collections.Users();
