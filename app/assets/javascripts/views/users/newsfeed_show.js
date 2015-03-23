FacebookApp.Views.NewsFeedShow = Backbone.CompositeView.extend({
  template: JST['users/newsfeed_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.posts(), 'add remove sync', this.renderPosts);
    this.listenTo(this.model.friends(), 'add remove sync', this.renderPosts);

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
    //this.renderRequests();
    return this;
  },

  renderPostForm: function() {
    var postFormView = new FacebookApp.Views.PostForm({model: this.model});
    this.$('#post-form').html(postFormView.render().$el);
  },

  addPost: function(post) {
    console.log("adding post: " + post);
    var postShowView = new FacebookApp.Views.PostShow({model: post, user: this.model});
    this.addSubview('.feed-items', postShowView);
  },

  renderPosts: function() {
    this.emptySubviewContainer('.feed-items');
    var that = this;
    this.model.friends().each(function(friend) {
      console.log("here now");
      friend.posts().each(that.addPost.bind(that));
    })
    console.log(this.model.posts());
    this.model.posts().each(this.addPost.bind(this));
  }

})
