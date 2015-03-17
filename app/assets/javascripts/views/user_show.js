FacebookApp.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  events: {
    'click button.add':'submit',
    'click .request-friend':'requestFriend',
    'click button.delete-post': 'destroyPost'
  },

  // orderOptions: {
  //   modelElement:
  //   modelName: 'post',
  //   subviewContainer: '#posts'
  // },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.collection = this.model.posts();
    this.listenTo(this.collection, 'add remove', this.renderPosts);
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

  addPost: function(post) {
    var postShowView = new FacebookApp.Views.PostShow({model: post, user: this.model});
    this.addSubview('#posts', postShowView);
  },

  renderPosts: function() {
    this.emptySubviewContainer('#posts');
    this.model.posts().each(this.addPost.bind(this));
  },

  submit: function(event) {
    event.preventDefault();
    var that = this;
    var postBody = this.$('input').val();
    var post = new FacebookApp.Models.Post({'author_id': FacebookApp.Models.currentUser.get('id'), 'body': postBody, 'receiver_id': this.model.get('id')});
    post.save({},{
      success: function() {
        that.model.posts().add(post, {merge: true}); //Add to the posts of the user who owns the current show page
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
  },

  destroyPost: function(event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var id = $target.attr('data-id');
    var post = this.model.posts().get(id);
    var that = this;
    post.destroy();
  }

})

// _.extend(FacebookApp.Views.UserShow.prototype, FacebookApp.Utils.OrdView);
