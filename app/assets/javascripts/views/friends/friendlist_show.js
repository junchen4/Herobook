FacebookApp.Views.FriendListShow = Backbone.CompositeView.extend({
  template: JST['friends/friendlist_show'],

  events: {

  },

  tagName: "section",

  className: "friendlist",


  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    console.log("rendering friendlist");
    var content = this.template({user: this.model});
    this.$el.html(content);

    this.renderList();
    return this;
  },

  addFriendShow: function(friend) {
    console.log("adding friend");
    var friendShowView = new FacebookApp.Views.FriendShow({model: friend});
    this.addSubview('.friends', friendShowView, false);
  },

  renderList: function() {
    this.emptySubviewContainer('.friends');
    this.model.friends().each(this.addFriendShow.bind(this));
  }


})

