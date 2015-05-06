FacebookApp.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/show'],

  events: {
    'click button.delete-post': 'destroyPost',
    'click button.add-comment':'submitComment',
    'click button.like-post':'likePost',
    'click button.unlike-post':'unlikePost'

  },

  initialize: function(options) {
    this.user = options.user;
    this.isFeed = options.isFeed;
    this.author = options.author;
    this.receiver = options.receiver;
    this.lastComment = options.lastComment;
    this.transitioning = false;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.likes(), 'add remove', this.render);
    this.listenTo(this.model.comments(), 'add', this.addComment);
    this.listenTo(this.model.comments(), 'remove', this.removeComment); 
  },

  render: function() {
    var content = this.template({post: this.model, user: this.user, isFeed: this.isFeed, lastComment: this.lastComment});
    this.$el.html(content);
    this.renderComments();
    this.renderCommentForm();
    return this;
  },

  renderCommentForm: function() {
    var commentFormView = new FacebookApp.Views.CommentForm({model: this.model});
    this.$('.comment-form').html(commentFormView.render().$el);
  },

/////////////////////

  removeComment: function(comment) {
    var subviewToRemove = _.findWhere(this.subviews('.comments'), {model: comment});
    this.removeSubview('.comments', subviewToRemove);
  },

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
        that.model.comments().add(comment, {merge: true}); //Add to the comments of the post
      }
    });
  },

  destroyPost: function(event) {
    event.preventDefault();
    var that = this;
    this.model.destroy({
      success: function() {
        that.author.posts().remove(that.model);
        that.receiver.posts().remove(that.model);
      }
    });
  },

  likePost: function(event) {
    if (this.transitioning === false) {
      this.transitioning = true;
      event.preventDefault();
      var like = new FacebookApp.Models.Like({'author_id': FacebookApp.Models.currentUser.get('id'), 'likeable_id': this.model.get('id'), 'likeable_type': 'Post'});
      var that = this;
      this.model.set('likeStatus', 'liked');
      this.author.posts().get(like.get('likeable_id')).set('likeStatus', 'liked');
      this.receiver.posts().get(like.get('likeable_id')).set('likeStatus', 'liked');
      like.save({}, {
        success: function() {
          that.model.likes().add(like, {merge: true});
          that.author.posts().get(like.get('likeable_id')).likes().add(like, {merge: true});
          that.receiver.posts().get(like.get('likeable_id')).likes().add(like, {merge: true});
          that.transitioning = false;
        }
      });
    }
  },

  unlikePost: function(event) {
    if (this.transitioning === false) {
      this.transitioning = true; 
      event.preventDefault();
      var like = this.model.likes().findWhere({author_id: FacebookApp.Models.currentUser.get('id')});
      var that = this;
      this.model.set('likeStatus', 'unliked');
      this.author.posts().get(like.get('likeable_id')).set('likeStatus', 'unliked');
      this.receiver.posts().get(like.get('likeable_id')).set('likeStatus', 'unliked');
      like.destroy({
        success: function() {
            that.model.likes().remove(like);
            that.author.posts().get(like.get('likeable_id')).likes().remove(like);
            that.receiver.posts().get(like.get('likeable_id')).likes().remove(like);
            that.transitioning = false;
        }
      });
    }
  }


})
