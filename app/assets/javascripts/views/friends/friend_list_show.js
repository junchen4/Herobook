FacebookApp.Views.FriendListShow = Backbone.CompositeView.extend({
  template: JST['friends/show'],

  events: {
    'click button.remove-friend':'removeFriend'
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function() {
    var content = this.template({friend: this.model, user: this.user});
    this.$el.html(content);
    return this;
  },

  removeFriend: function(event) {
    event.preventDefault();
    var that = this;
    this.model.save({
      success: function() {
        that.collection.add(that.model, {merge: true});
        that.user.set('friendStatus', 'none');
      }
    });
  },

  declineRequest: function(event) {
    event.preventDefault();
    this.model.destroy();
  }


})
