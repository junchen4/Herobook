FacebookApp.Views.RequestButton = Backbone.CompositeView.extend({
  template: JST['request_buttons/show'],

  // events: {
  //   'click button.accept-friend':'acceptRequest',
  //   'click button.decline-friend':'declineRequest'
  // },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, 'change:friendStatus', this.render);
    // this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function() {
    var content = this.template({request: this.model, user: this.user});
    this.$el.html(content);
    return this;
  }


})
