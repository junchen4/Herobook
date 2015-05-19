FacebookApp.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['users/feed_show'],

  events: {
    "click #account-nav": "toggleAccountNav",
    "click": "hideAccountNav",
    "click .logout": "logout"
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(FacebookApp.Models.currentUser, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderItems);
    this.listenTo(this.model, 'sync', this.listenComments);
    this.listenTo(this.model.feedPosts(), 'add remove', this.render);
  },

  render: function() {
    console.log("rendering feed");
    var content = this.template({user: this.user, feed: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderItems();
    this.renderSearch();
    return this;
  },

//////////

  listenComments: function () { //Updates feed-post's title based on last comment
    var that = this;
    this.model.feedPosts().each(function (post) {
      that.listenTo(post.comments(), 'add remove', that.render);
    })
  },

  toggleAccountNav: function (event) {
    if (!$('.account-nav-links').hasClass('hidden')) {
      $('.account-nav-links').addClass('hidden');
    } else {
      $($(event.currentTarget).data('link')).removeClass('hidden');
      event.stopPropagation();
    }
  },

  hideAccountNav: function () {
    if (!$('.account-nav-links').hasClass('hidden')) {
      $('.account-nav-links').addClass('hidden');
    }
  },

/////////

  renderSearch: function() {
    var searchShowView = new FacebookApp.Views.SearchShow();
    this.$('.content-search').html(searchShowView.render().$el);
  },

  renderPostForm: function() {
    var postFormView = new FacebookApp.Views.PostForm({user: this.user, feed: this.model, isFeed: true});
    this.$('#post-form-area').html(postFormView.render().$el);
  },

//////////////////////////////////////////

  removeItem: function(item) {
    var subviewToRemove = _.findWhere(this.subviews('.feed-items'), {model: item});
    this.removeSubview('.feed-items', subviewToRemove);
  },

  addPostItem: function(item) {
    var lastComment = new FacebookApp.Models.Comment();

    //Set the last comment in a post, if the last comment exists
    if (item.comments().length !== 0) {
      lastComment.set(item.comments().at(item.comments().length - 1).attributes);
    }

    var showView = new FacebookApp.Views.PostShow({model: item, user: this.user, feed: this.model, lastComment: lastComment, isFeed: true});

    this.addSubview('.feed-items', showView, true);
  },

  addAcceptanceItem: function(item) {
    var showView = new FacebookApp.Views.ItemAcceptanceShow({model: item, user: this.model});
    this.addSubview('.feed-items', showView, true);
  },

  renderItems: function() {
    this.emptySubviewContainer('.feed-items');
    //sort models by date to order chronologically in feed
    var array = [];
    array = array.concat(this.model.feedPosts().models).concat(this.model.feedAcceptances().models);
    array.sort(function(a,b) {
      var compA = a.get('myDate');
      var compB = b.get('myDate');
      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });

    var that = this;
    array.forEach(function(el) {
      if (el.url() == "/posts/" + el.get('id')) {
        that.addPostItem(el);
      } else {
        that.addAcceptanceItem(el);
      }
    });

  },

  logout: function () {
     $.ajax({
      type: "DELETE",
      url: "/session",
      success: function () {
        window.location.href = 'http://my-facebook.herokuapp.com/';
      }
    });
  }
})
