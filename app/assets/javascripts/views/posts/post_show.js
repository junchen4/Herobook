FacebookApp.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/show'],

  events: {
    'click button.add-comment':'saveComment',
    'click button.delete-comment':'destroyComment'
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
    this.$('#comment-form').html(commentFormView.render().$el);
  },

  addComment: function(comment) {
    var commentShowView = new FacebookApp.Views.CommentShow({model: comment, user: this.user});
    this.addSubview('#comments', commentShowView);
  },

  renderComments: function() {
    this.emptySubviewContainer('#comments');
    this.model.comments().each(this.addComment.bind(this));
  },

  saveComment: function(event) {
    event.preventDefault();
    var that = this;
    var commentBody = this.$('input').val();
    var comment = new FacebookApp.Models.Comment({'author_id': FacebookApp.Models.currentUser.get('id'), 'body': commentBody, 'post_id': this.model.get('id')});
    comment.save({},{
      success: function() {
        that.model.comments().add(comment, {merge: true}); //Add to the comments of the user who owns the current show page
      }
    })
  },

  destroyComment: function(event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var id = $target.attr('data-id');
    var comment = this.model.comments().get(id);
    var that = this;
    comment.destroy();
  }


})
