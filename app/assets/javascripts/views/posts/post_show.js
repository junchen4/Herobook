FacebookApp.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/show'],

  events: {
    'click button.delete-post': 'destroyPost',
    'click button.add-comment':'submitComment',
    'click button.delete-comment':'destroyComment',
    'click button.like-post':'likePost'

  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
    this.collection = this.model.comments();
    this.listenTo(this.collection, 'add remove', this.renderComments);
  },

  render: function() {
    var content = this.template({post: this.model, user: this.user});
    this.$el.html(content);
    this.renderCommentForm();
    this.renderComments();
    return this;
  },

  renderCommentForm: function() {
    var commentFormView = new FacebookApp.Views.CommentForm({model: this.model});
    this.$('.comment-form').html(commentFormView.render().$el);
  },

  addComment: function(comment) {
    var commentShowView = new FacebookApp.Views.CommentShow({model: comment, user: this.user});
    this.addSubview('#comments', commentShowView);
  },

  renderComments: function() {
    this.emptySubviewContainer('#comments');
    this.model.comments().each(this.addComment.bind(this));
  },

  submitComment: function(event) {
    event.preventDefault();
    var that = this;
    var commentBody = this.$('input').val();
    var comment = new FacebookApp.Models.Comment({'body': commentBody, 'post_id': this.model.get('id')});
    comment.save({}, {
      success: function() {
        that.model.comments().add(comment, {merge: true}); //Add to the comments of the user who owns the current show page
      }
    });
  },

  likePost: function(event) {
    event.preventDefault();
    var like = new FacebookApp.Models.Like({'author_id': FacebookApp.Models.currentUser.get('id'), 'likeable_id': this.model.get('id'), 'likeable_type': 'Post'});
    var that = this;
    console.log(like);
    like.save({}, {
      success: function() {
        that.model.likes().add(like, {merge: true});
        FacebookApp.Models.currentUser.likes().add(like, {merge: true});
      }
    });
  },

  destroyComment: function(event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var id = $target.attr('data-id');
    var comment = this.model.comments().get(id);
    var that = this;
    comment.destroy();
  },

  destroyPost: function(event) {
    event.preventDefault();
    // $target = $(event.currentTarget);
    // var id = $target.attr('data-id');
    // var post = this.model.posts().get(id);
    this.model.destroy();
  }


})
