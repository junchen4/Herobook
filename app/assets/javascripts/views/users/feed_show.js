FacebookApp.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['users/feed_show'],

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.feedPosts(), 'add remove', this.render);
    var that = this;
    // this.model.feedPosts().each(function(post) {
    //   that.listenTo(post.comments(), 'add remove change', that.render);
    // });
    // this.listenTo(this.model.feedPosts(), 'change', this.render);
    // this.listenTo(this.model.feedCommentedPosts(), 'add', this.addItem);
    // this.listenTo(this.model.feedCommentedPosts(), 'remove', this.removeItem);
  },

  render: function() {
    var content = this.template({user: this.user, feed: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderItems();
    // this.renderSortedItems();
    this.renderSearch();
    //this.renderRequests();
    return this;
  },

  renderSearch: function() {
    var searchShowView = new FacebookApp.Views.SearchShow();
    this.$('.content-search').html(searchShowView.render().$el);
  },

  renderPostForm: function() {
    var postFormView = new FacebookApp.Views.PostForm({model: this.model});
    this.$('#post-form').html(postFormView.render().$el);
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
    var showView = new FacebookApp.Views.PostShow({model: item, user: this.user, lastComment: lastComment, isFeed: true});

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
    console.log("array", array);
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

    // this.model.feedPosts().each(this.addPostItem.bind(this));
    // this.model.feedAcceptances().each(this.addAcceptanceItem.bind(this));
  },

  renderSortedItems: function() {
    var list = this.$('.feed-items');
    var that = this;
    var postItems = this.$('.post-feed-item').get();
    var acceptanceItems = this.$('.acceptance-feed-item').get();
    var listItems = postItems.concat(acceptanceItems);


    listItems.sort(function(a,b) {
      var compA = that.$(a).attr('data-sort');
      var compB = that.$(b).attr('data-sort');
      return (compA < compB) ? 1 : (compA > compB) ? -1 : 0;
    });
    $.each(listItems, function(idx, itm) {list.append(itm);});
  }

})
