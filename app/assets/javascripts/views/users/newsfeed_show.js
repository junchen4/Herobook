FacebookApp.Views.NewsFeedShow = Backbone.CompositeView.extend({
  template: JST['users/newsfeed_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.friends(), 'add remove', this.renderPosts);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    // this.renderPostForm();
    this.renderPosts();
    //this.renderRequests();
    return this;
  },

  addPost: function(post) {
    console.log("adding post: " + post);
    var postShowView = new FacebookApp.Views.PostShow({model: post, user: this.model});
    this.addSubview('#feed-items', postShowView);
  },

  renderPosts: function() {
    this.emptySubviewContainer('#feed-items');
    var that = this;    
    this.model.friends().each(function(friend) {
      console.log("here now");
      friend.posts().each(that.addPost.bind(that));
      //friend.authoredPosts.each(that.addPost.bind(that));
      // friend.receivedPosts.each(that.addPost.bind(that));
    })
  }

})
