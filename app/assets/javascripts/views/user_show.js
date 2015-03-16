FacebookApp.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  events: {
    'click .add':'submit',
    'click .request-friend':'requestFriend'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.collection = this.model.posts();
    this.listenTo(this.collection, 'add', this.renderPosts);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderPosts();
    return this;
  },

  renderPostForm: function() {
    var postFormView = new FacebookApp.Views.PostForm({model: this.model});
    this.$('#post-form').html(postFormView.render().$el);
  },

  renderPosts: function() {
    var postsView = new FacebookApp.Views.PostsShow({collection: this.collection, model: this.model}); 
    this.$('#posts').html(postsView.render().$el);
  },

  submit: function(event) {
    event.preventDefault();
    var that = this;
    var postBody = this.$('input').val();
    var post = new FacebookApp.Models.Post({'author_id': FacebookApp.Models.currentUser.get('id'), 'body': postBody, 'receiver_id': this.model.get('id')});
    post.save({},{
      success: function() {
        that.model.posts().add(post, {merge: true}); //Add to the posts of the user who owns the current show page
        that.render();
      }
    })
  },

  requestFriend: function(event) {
    event.preventDefault();
    var that = this;
    var request = new FacebookApp.Models.Request({'requestee_id': this.model.id});
    request.save({}, {
      success: function() {
        that.model.requests().add(request, {merge: true});
        that.render();
      }
    })
  }

})
