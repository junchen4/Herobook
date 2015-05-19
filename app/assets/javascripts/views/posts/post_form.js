FacebookApp.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  tagName: 'form',

  className: 'form-post',

  events: {
    'click button.add-post':'submitPost'
  },

  initialize: function (options) {
    this.user = options.user;
    this.posts = options.posts;
    this.feed = options.feed;
    this.isFeed = options.isFeed;
  },

  render: function() {
    var content = this.template({user: this.user});
    this.$el.html(content);
    return this;
  },

  submitPost: function(event) {
    event.preventDefault();
    var postBody = this.$('input').val();
    var post = new FacebookApp.Models.Post({
                    'author_id': FacebookApp.Models.currentUser.get('id'),
                    'body': postBody,
                    'receiver_id': this.user.get('id')
                    });
    var that = this;
    post.save({},{
      success: function() {
        if (!that.isFeed) { 
          that.posts.add(post, {merge: true});
        } else {
          that.feed.feedPosts().add(post, {merge: true});
        }
      }
    });
  }
})
