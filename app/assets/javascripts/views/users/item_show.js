FacebookApp.Views.ItemShow = Backbone.CompositeView.extend({
  template: JST['users/item_show'],

  events: {
    'click button.delete-post': 'destroyPost',
    'click button.add-comment':'submitComment',
    'click button.like-post':'likePost',
    'click button.unlike-post':'unlikePost'

  },

  initialize: function(options) {
    this.user = options.user;
    this.lastComment = options.lastComment;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.likes(), 'add remove', this.render);
    this.listenTo(this.model.comments(), 'add remove', this.renderComments);
  },

  render: function() {
    var content = this.template({post: this.model, user: this.user, lastComment: this.lastComment});
    this.$el.html(content);
    if (item.url() === "/posts/" + item.get('id')) {
      this.renderPost();
    }
    } else if (item.url() === "/requests/") {
      var showView = new FacebookApp.Views.ItemShow({model: item, user: this.model, lastComment: lastComment});
    }
    // this.renderCommentForm();
    // this.renderComments();
    return this;
  },

  renderPost: function() {
    var postShowView = new FacebookApp.Views.PostShow({model: this.model, user: this.user});
    this.$('.feed-post').html(postShowView.render().$el);
  },

  removePost: function(post) {
    console.log("removing post", post);
    var subviewToRemove = _.findWhere(this.subviews('.posts'), {model: post});
    this.removeSubview('.posts', subviewToRemove);
  },

  addPost: function(post) {
    console.log(post);
    var postShowView = new FacebookApp.Views.PostShow({model: post, user: this.model});
    this.addSubview('.posts', postShowView, true);
  },

  renderPosts: function() {
    this.emptySubviewContainer('.posts');
    this.model.posts().each(this.addPost.bind(this));
  },

  renderCommentForm: function() {
    var commentFormView = new FacebookApp.Views.CommentForm({model: this.model});
    this.$('.comment-form').html(commentFormView.render().$el);
  },

/////////////////////

  addComment: function(comment) {
    var commentShowView = new FacebookApp.Views.CommentShow({model: comment, collection: this.model.comments(), user: this.user, post: this.model});
    this.addSubview('.comments', commentShowView);
  },

  renderComments: function() {
    this.emptySubviewContainer('.comments');
    this.model.comments().each(this.addComment.bind(this));
  },

//////////////////////

  submitComment: function(event) {
    event.preventDefault();
    var that = this;
    var commentBody = this.$('input').val();
    var comment = new FacebookApp.Models.Comment({'body': commentBody, 'post_id': this.model.get('id')});
    comment.save({}, {
      success: function() {
        that.model.comments().add(comment, {merge: true}); //Add to the comments of the user who owns the current show page
        FacebookApp.Models.currentUser.comments().add(comment, {merge: true});
        // FacebookApp.Collections.newsfeedItems.add(comment, {merge: true});
      }
    });
  },

  destroyPost: function(event) {
    event.preventDefault();
    this.model.destroy();
  },

  likePost: function(event) {
    event.preventDefault();
    var like = new FacebookApp.Models.Like({'author_id': FacebookApp.Models.currentUser.get('id'), 'likeable_id': this.model.get('id'), 'likeable_type': 'Post'});
    var that = this;
    like.save({}, {
      success: function() {
        that.model.likes().add(like, {merge: true});
        FacebookApp.Models.currentUser.likes().add(like, {merge: true});
        that.model.set('likeStatus', 'liked');
        that.render();
      }
    });
  },

  unlikePost: function(event) {
    event.preventDefault();
    var like = this.model.likes().findWhere({author_id: FacebookApp.Models.currentUser.get('id')});
    var that = this;
    like.destroy({
      success: function() {
          that.model.set('likeStatus', 'unliked');
          that.render();
      }
    });
  }


})
