Herobook.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['users/feed_show'],

  events: {
    "click #account-nav": "toggleAccountNav",
    "click": "hideAccountNav",
    "click .logout": "logout",
    "click .view-notification-post": 'renderPostModal',
    "click .remove-modal": "removeModal",
    "click .post-modal .delete-post": "removeModal"
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(Herobook.Models.currentUser, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderItems);
    this.listenTo(this.model, 'sync', this.listenComments);
    this.listenTo(this.model.feedPosts(), 'add remove', this.renderItems);
    this.listenTo(this.model.feedAcceptances(), 'add remove', this.renderItems);
    this.listenTo(Herobook.Collections.notifications, 'add remove change:viewed sync', this.renderNotifications);
    this.listenTo(Herobook.Collections.notifications, 'add remove change:viewed sync', this.renderNotificationCount);  
  },

  render: function() {
    var content = this.template({user: this.user, feed: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderItems();
    this.renderSearch();
    this.renderNotifications();
    this.renderNotificationCount();
    return this;
  },

//////////

  listenComments: function () { //Updates feed-post's title based on last comment
    var that = this;
    this.model.feedPosts().each(function (post) {
      that.listenTo(post.comments(), 'add remove', that.renderItems);
    })
  },

  removeModal: function (event) {
    event.preventDefault();
    $('.post-modal').addClass('hidden');
    $(".overlay").addClass("hidden");
    $('.post-modal article').remove();
    this.renderItems();
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
    var searchShowView = new Herobook.Views.SearchShow();
    this.$('.content-search').html(searchShowView.render().$el);
  },

  renderPostForm: function() {
    var postFormView = new Herobook.Views.PostForm({user: this.user, feed: this.model, isFeed: true});
    this.$('#post-form-area').html(postFormView.render().$el);
  },

//////////////////////////////////////////

  renderNotificationCount: function() {
    this.emptySubviewContainer('.notification-count');
    
    var showView = new Herobook.Views.NotificationCountShow();
    this.addSubview('.notification-count', showView);
  },
////////////////////////////////

  renderPostModal: function (event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var post = this.model.feedPosts().get($target.data('post'));
    $('.post-modal').toggleClass('hidden');
    $('.overlay').toggleClass('hidden');

    var lastComment = new Herobook.Models.Comment();
    //Set the last comment in a post, if the last comment exists
    if (post.comments().length !== 0) {
      lastComment.set(post.comments().at(post.comments().length - 1).attributes);
    }

    var postShow = new Herobook.Views.PostShow({model: post, user: this.user, isFeed: true, isModal: true, feed: this.model, lastComment: lastComment});
    $('.post-modal').append(postShow.render().$el);    
  },

  addNotification: function(notification) {
    var showView = new Herobook.Views.NotificationShow({model: notification});
    this.addSubview('.notifications', showView, true);
  },

  renderNotifications: function() {
    this.emptySubviewContainer('.notifications');

    //sort models by date to ensure order chronologically in feed
    var array = [];
    array = array.concat(Herobook.Collections.notifications.models);
    array.sort(function(a,b) {
      var compA = a.get('myDate');
      var compB = b.get('myDate');
      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });

    var that = this;
    var allViewed = true;
    array.forEach(function(el) {
        if (el.get('viewed') == 'false') {
          allViewed = false;
          that.addNotification(el);
        }
    });
    if (allViewed) {
      $('.notifications').html("You have no notifications");
    }
  },

///////////////////////////////////////////

  removeItem: function(item) {
    var subviewToRemove = _.findWhere(this.subviews('.feed-items'), {model: item});
    this.removeSubview('.feed-items', subviewToRemove);
  },

  addPostItem: function(item) {
    var lastComment = new Herobook.Models.Comment();

    //Set the last comment in a post, if the last comment exists
    if (item.comments().length !== 0) {
      lastComment.set(item.comments().at(item.comments().length - 1).attributes);
    }

    var showView = new Herobook.Views.PostShow({model: item, user: this.user, feed: this.model, lastComment: lastComment, isFeed: true, isModal: false});

    this.addSubview('.feed-items', showView, true);
  },

  addAcceptanceItem: function(item) {
    var showView = new Herobook.Views.ItemAcceptanceShow({model: item, user: this.user, feed: this.model, isFeed: true});
    this.addSubview('.feed-items', showView, true);
  },

  renderItems: function() {
    this.emptySubviewContainer('.feed-items');
    //sort models by date to ensure order chronologically in feed
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
        window.location.href = 'http://herobook.space/';
      }
    });
  }
})