FacebookApp.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST['comments/show'],

  events: {
    'click button.delete-comment':'destroyComment',
    'click button.like-comment':'likeComment',
    'click button.unlike-comment':'unlikeComment'
  },

  initialize: function(options) {
    this.user = options.user;
    this.post = options.post;
    this.listenTo(this.model, 'sync', this.render);
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
    var comment = this.collection.get(id);
    comment.destroy({
      success: function() {
        FacebookApp.Models.currentUser.comments().remove(comment);
        FacebookApp.Models.currentUser.posts().get(comment.get('post_id')).comments().remove(comment); //Remove comment from current user's post that contains the comment
      }
    });
  },

  likeComment: function() {
    event.preventDefault();
    var like = new FacebookApp.Models.Like({'author_id': FacebookApp.Models.currentUser.get('id'), 'likeable_id': this.model.get('id'), 'likeable_type': 'Comment'});
    var that = this;
    like.save({}, {
      success: function() {
        that.model.likes().add(like, {merge: true});
        FacebookApp.Models.currentUser.likes().add(like, {merge: true});
        FacebookApp.Models.currentUser.comments().get(like.get('likeable_id')).set('likeStatus', 'liked');
        that.model.set('likeStatus', "liked");
        that.render();
      }
    });
  },

  unlikeComment: function() {
    event.preventDefault();
    var like = this.model.likes().findWhere({author_id: FacebookApp.Models.currentUser.get('id')});
    var that = this;
    like.destroy();
    //   success: function() {
    //       that.model.set('likeStatus', "unliked");
    //       that.render();
    //   }
    // });
  }

})
