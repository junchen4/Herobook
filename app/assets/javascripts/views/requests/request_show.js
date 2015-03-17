FacebookApp.Views.RequestShow = Backbone.CompositeView.extend({
  template: JST['requests/show'],

  events: {
    'click button.accept-friend':'acceptRequest',
    'click button.decline-friend':'declineRequest'
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.collection, 'add remove', this.render);
  },

  render: function() {
    var content = this.template({request: this.model, user: this.user});
    this.$el.html(content);
    return this;
  },

  acceptRequest: function(event) {
    event.preventDefault();
    var that = this;
    this.model.save({}, {
      success: function() {
        that.collection.add(that.model, {merge: true}); //Request is saved into the database, but friends needs to query from the database, so we add the users to each others' friends collections in order to render without a refresh
        FacebookApp.Models.currentUser.friends().add(that.user, {merge: true});
        that.user.friends().add(FacebookApp.Models.currentUser, {merge: true});
        that.user.set('friendStatus', 'accepted');
      }
    });
  },

  declineRequest: function(event) {
    event.preventDefault();
    var that = this;
    this.model.destroy({
      success: function() {
        that.user.set('friendStatus', 'none');
      }
    });
  }


})
