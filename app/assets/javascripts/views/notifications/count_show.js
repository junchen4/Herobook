Herobook.Views.NotificationCountShow = Backbone.CompositeView.extend({
  template: JST['notifications/count_show'],

  tagName: 'label',

  initialize: function() {
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }

})
