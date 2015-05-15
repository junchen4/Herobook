FacebookApp.Views.ItemAcceptanceShow = Backbone.CompositeView.extend({
  template: JST['friend_acceptance_feed/item_acceptance_show'],

  tagName: 'article',

  className: 'acceptance-feed-item',

  events: {
    'click button.delete-post': 'destroyPost',
    'click button.add-comment':'submitComment',
    'click button.like-post':'likePost',
    'click button.unlike-post':'unlikePost'
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({item: this.model, user: this.user});
    this.$el.html(content);
    return this;
  }


})
