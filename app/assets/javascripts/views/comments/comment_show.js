Herobook.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST['comments/show'],

  events: {
    'click button.delete-comment':'destroyComment',
    'click button.like-comment':'likeComment',
    'click button.unlike-comment':'unlikeComment'
  },

  initialize: function(options) {
    this.user = options.user;
    this.post = options.post;
    this.transitioning = false;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.likes(), 'add remove', this.render);
  },


  render: function() {
    var content = this.template({comment: this.model, user: this.user});
    this.$el.html(content);
    return this;
  },

  destroyComment: function(event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var id = $target.attr('data-id');
    var that = this;
    this.model.destroy({
      success: function() {
        that.post.comments().remove(that.model);
      }
    });
  },

  likeComment: function() {
    if (this.transitioning === false) {
      this.transitioning = true; 
      event.preventDefault();
      var like = new Herobook.Models.Like({'author_id': Herobook.Models.currentUser.get('id'), 'likeable_id': this.model.get('id'), 'likeable_type': 'Comment'});
      var that = this;
      this.model.set('likeStatus', "liked");
      like.save({}, {
        success: function() {
          that.model.likes().add(like, {merge: true});
          that.transitioning = false;
        }
      });
    }
  },

  unlikeComment: function() {
    if (this.transitioning === false) {
      this.transitioning = true; 
      event.preventDefault();
      var like = this.model.likes().findWhere({author_id: Herobook.Models.currentUser.get('id')});
      var that = this;
      this.model.set('likeStatus', "unliked");
      like.destroy({
        success: function() {
            that.transitioning = false;
        }
      });
    }
  }
})
