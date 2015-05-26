Herobook.Views.ItemAcceptanceShow = Backbone.CompositeView.extend({
  template: JST['friend_acceptance_feed/item_acceptance_show'],

  tagName: 'article',

  className: 'acceptance-feed-item group',

  events: {
    'click .delete-acceptance': 'destroyAcceptance'
  },

  initialize: function(options) {
    this.user = options.user;
    this.feed= options.feed;
    this.isFeed = options.isFeed;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({item: this.model, user: this.user});
    this.$el.html(content);
    return this;
  },

  destroyAcceptance: function(event) {
    event.preventDefault();
    $article = $(event.currentTarget).parent(); //item disappears transition
    $article.addClass('disappeared'); //item disappears transition

    setTimeout(function () {
      var that = this;
      this.model.destroy({
        success: function() {
          if (!that.isFeed) {
            that.posts.remove(that.model);
          } else {
            that.feed.feedPosts().remove(that.model);
          }
        }
      });
    }.bind(this), 900);

  }


})
