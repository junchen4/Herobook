FacebookApp.Views.NewsFeedShow = Backbone.CompositeView.extend({
  template: JST['users/newsfeed_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.posts(), 'add remove sync', this.renderPosts);
    this.listenTo(this.model.friends(), 'add remove sync', this.renderPosts);
    this.listenTo(this.model.newsfeedPosts(), 'add remove', this.renderPosts);
    var that = this;
    this.model.friends().each(function(friend) {
      that.listenTo(friend.posts(), 'add remove sync', that.renderPosts);
    })
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderPosts();
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

  addPost: function(post) {
    console.log("adding post: ", post);
    console.log("this user",this.model);
    var postShowView = new FacebookApp.Views.PostShow({model: post, user: this.model});
    this.addSubview('.feed-items', postShowView);
  },

  renderPosts: function() {
    this.emptySubviewContainer('.feed-items');
    this.model.newsfeedPosts().each(this.addPost.bind(this));
  }

})
