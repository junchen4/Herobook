FacebookApp.Views.NewsFeedShow = Backbone.CompositeView.extend({
  template: JST['users/newsfeed_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.newsfeedPosts(), 'add', this.addItem);
    this.listenTo(this.model.newsfeedPosts(), 'remove', this.removeItem);
    this.listenTo(this.model.newsfeedCommentedPosts(), 'add', this.addItem);
    this.listenTo(this.model.newsfeedCommentedPosts(), 'remove', this.removeItem);
    this.listenTo(this.model.friends(), 'add remove sync', this.renderPosts);

  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderItems();
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

  addItem: function(item) {
    var lastComment = new FacebookApp.Models.Comment();

    //Set the last comment in a post, if the last comment exists
    if (item.comments().length !== 0) {
      lastComment.set(item.comments().at(item.comments().length - 1).attributes);
    }
    console.log("last comment", lastComment.attributes);
    if (item.url() === "/posts/" + item.get('id')) {
      var showView = new FacebookApp.Views.ItemShow({model: item, user: this.model, lastComment: lastComment});
    }

    this.addSubview('.feed-items', showView, true);
  },

  renderItems: function() {
    this.emptySubviewContainer('.feed-items');
    var newsfeedItems = new FacebookApp.Collections.NewsfeedItems([], {user: this.model});
    newsfeedItems.add(this.model.newsfeedPosts().models);
    newsfeedItems.add(this.model.newsfeedCommentedPosts().models);
    newsfeedItems.sort();
    console.log("newsfeed posts", this.model.newsfeedPosts());
    console.log("newsfeed commented posts", this.model.newsfeedCommentedPosts());
    console.log("newsfeed items", newsfeedItems);

    newsfeedItems.each(this.addItem.bind(this));
  }

})
