Herobook.Views.NotificationShow = Backbone.CompositeView.extend({
  template: JST['users/notification_show'],

  tagName: 'article',

  events: {
    'click .view-notification': 'markViewed'
  },

  initialize: function(options) {
  },

  render: function() {
    var content = this.template({notification: this.model});
    this.$el.html(content);

    return this;
  },

  //mark as "read"
  markViewed: function (event) {
    event.preventDefault();
    this.model.save({viewed: "true"});
  }

})

