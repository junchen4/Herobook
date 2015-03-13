FacebookApp.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  events: {
    'click button':'submit'
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
    var post = new FacebookApp.Models.Post();
    var that = this;
    var data = this.$el.serializeJSON();
    post.set(data);
    post.save({},{
      success: function() {
        that.model.posts().add(post, {merge: true});
        that.render();
      }
    })
  }

})
