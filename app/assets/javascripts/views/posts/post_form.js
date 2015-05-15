FacebookApp.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  tagName: 'form',

  className: 'form-post',

  events: {
    'click button.add-post':'submitPost'
  },

  initialize: function (options) {
    this.user = options.user;
    this.feed = options.feed;
  },

  render: function() {
    var content = this.template({user: this.user});
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
                    'receiver_id': this.user.get('id')
                    });
    post.save({},{
      success: function() {
        FacebookApp.Models.currentUser.posts().add(post, {merge: true});
        that.user.posts().add(post, {merge: true});
        that.feed.feedPosts().add(post, {merge: true});
      }
    });
  }
})
