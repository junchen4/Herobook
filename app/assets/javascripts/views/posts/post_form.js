FacebookApp.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  events: {
    'click button.add-post':'submitPost'
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },

  submitPost: function(event) {
    event.preventDefault();
    var that = this;
    var postBody = this.$('input').val();
    var post = new FacebookApp.Models.Post({
                    'author_id': FacebookApp.Models.currentUser.get('id'),
                    'body': postBody,
                    'receiver_id': this.model.get('id')
                    });
    post.save({},{
      success: function() {
        FacebookApp.Models.currentUser.posts().add(post, {merge: true});
        that.model.posts().add(post, {merge: true});
        console.log(that.model.posts());
      }
    });
  }
})
