FacebookApp.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  events: {
    'click .add-post':'submit',
    'click .request-friend':'requestFriend'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var that = this;
    //var data = this.$el.serializeJSON();
    var postBody = this.$('input').val();
    var post = new FacebookApp.Models.Post({'body': postBody});
    post.save({},{
      success: function() {
        that.model.posts().add(post, {merge: true});
        that.render();
      }
    })
  },

  requestFriend: function(event) {
    event.preventDefault();
    var that = this;
    var request = new FacebookApp.Models.Request({'requestee_id': this.model.id});
    request.save({}, {
      success: function() {
        that.model.requests().add(request, {merge: true});
        that.render();
      }
    })
  }

})
