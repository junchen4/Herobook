FacebookApp.Views.InfoShow = Backbone.CompositeView.extend({
  template: JST['users/info_show'],

  // events: {
  //   'click .request-friend':'requestFriend',
  //   // 'click button.delete-post': 'destroyPost',
  //   'click button.remove-friend': 'removeFriend'
  // },

  tagName: "section",

  className: "about",


  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    if (FacebookApp.Models.currentUser.get('id') === this.model.get('id')) {
      this.listenTo(this.model.requests(), 'add remove', this.renderRequests);
    }
    this.listenTo(this.model.friends(), 'add remove', this.renderFriendList);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },



})

// _.extend(FacebookApp.Views.UserShow.prototype, FacebookApp.Utils.OrdView);
