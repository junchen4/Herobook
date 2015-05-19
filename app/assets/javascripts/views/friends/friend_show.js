Herobook.Views.FriendShow = Backbone.CompositeView.extend({
  template: JST['friends/friend_show'],

  tagName: "div",

  className: "friend-show",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({friend: this.model});
    this.$el.html(content);

    return this;
  }

})

