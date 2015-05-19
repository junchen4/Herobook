Herobook.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['users/feed_show'],

  events: {
    "click #account-nav": "toggleAccountNav",
    "click": "hideAccountNav",
    "click .logout": "logout"
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(Herobook.Models.currentUser, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderItems);
    this.listenTo(this.model, 'sync', this.listenComments);
    this.listenTo(this.model.feedPosts(), 'add remove', this.render);
<<<<<<< HEAD

    // setInterval(this.updateFeed.bind(this), 10000); //Update feed every 10 seconds
=======
>>>>>>> posts
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
    var searchShowView = new Herobook.Views.SearchShow();
    this.$('.content-search').html(searchShowView.render().$el);
  },

  renderPostForm: function() {
<<<<<<< HEAD
    var postFormView = new FacebookApp.Views.PostForm({user: this.user, feed: this.model});
=======
    var postFormView = new Herobook.Views.PostForm({user: this.user, feed: this.model, isFeed: true});
>>>>>>> posts
    this.$('#post-form-area').html(postFormView.render().$el);
  },

//////////////////////////////////////////

  removeItem: function(item) {
    var subviewToRemove = _.findWhere(this.subviews('.feed-items'), {model: item});
    this.removeSubview('.feed-items', subviewToRemove);
  },

  addPostItem: function(item) {
<<<<<<< HEAD
    var lastComment = new FacebookApp.Models.Comment();
=======
    var lastComment = new Herobook.Models.Comment();
>>>>>>> posts

    //Set the last comment in a post, if the last comment exists
    if (item.comments().length !== 0) {
      lastComment.set(item.comments().at(item.comments().length - 1).attributes);
    }

<<<<<<< HEAD
    var author = FacebookApp.Collections.users.get(item.get('author_id'));
    var receiver = FacebookApp.Collections.users.get(item.get('receiver_id'));

    var postShowView = new FacebookApp.Views.PostShow({model: item, user: this.user, author: author, receiver: receiver, lastComment: lastComment, isFeed: true});
=======
    var showView = new Herobook.Views.PostShow({model: item, user: this.user, feed: this.model, lastComment: lastComment, isFeed: true});
>>>>>>> posts

    this.addSubview('.feed-items', postShowView, true);
  },

  addAcceptanceItem: function(item) {
<<<<<<< HEAD
    var acceptanceShowView = new FacebookApp.Views.ItemAcceptanceShow({model: item, user: this.model});
    this.addSubview('.feed-items', acceptanceShowView, true);
=======
    var showView = new Herobook.Views.ItemAcceptanceShow({model: item, user: this.model});
    this.addSubview('.feed-items', showView, true);
>>>>>>> posts
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
