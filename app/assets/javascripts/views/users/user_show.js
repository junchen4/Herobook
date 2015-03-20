FacebookApp.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  events: {
    'click button.add-post':'submitPost',
    'click .request-friend':'requestFriend',
    'click button.delete-post': 'destroyPost',
    'click button.remove-friend': 'removeFriend'
  },

  // orderOptions: {
  //   modelElement:
  //   modelName: 'post',
  //   subviewContainer: '#posts'
  // },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.posts(), 'add remove', this.renderPosts);
    this.listenTo(this.model.requests(), 'add remove', this.renderRequests);
    this.listenTo(this.model.friends(), 'add remove', this.renderFriendList);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderPosts();
    this.renderRequests();
    this.renderFriendList();
    this.renderRequestButtons();
    return this;
  },

  renderPostForm: function() {
    var postFormView = new FacebookApp.Views.PostForm({model: this.model});
    this.$('#post-form').html(postFormView.render().$el);
  },

  addPost: function(post) {
    if(post.get('receiver_id') === this.model.get('id')) {
      var postShowView = new FacebookApp.Views.PostShow({model: post, user: this.model});
      this.addSubview('#posts', postShowView);
    }
  },

  renderPosts: function() {
    this.emptySubviewContainer('#posts');
    this.model.posts().each(this.addPost.bind(this));
  },
//////////////////
  addRequest: function(request) {
    var requestShowView = new FacebookApp.Views.RequestShow({
                      model: request,
                      collection: this.model.requests(),
                      user: this.model
                      });
    this.addSubview('.friend-requests', requestShowView);
  },

  renderRequests: function() {
    this.emptySubviewContainer('.friend-requests');
    this.model.requests().each(this.addRequest.bind(this));
  },
//////////////////
  renderRequestButtons: function(request) {
    this.emptySubviewContainer('.request-buttons');
    var requestButtonView = new FacebookApp.Views.RequestButton({
      model: request,
      collection: this.model.requests(),
      user: this.model
    });
    this.addSubview('.request-buttons', requestButtonView);
  },
//////////////////
  addFriendListLink: function(friend) {
      var friendListShowView = new FacebookApp.Views.FriendListShow({
                        model: friend,
                        collection: this.model.friends(),
                        user: this.model
                        });
      this.addSubview('.friend-list', friendListShowView);
  },

  renderFriendList: function() {
    this.emptySubviewContainer('.friend-list');
    this.model.friends().each(this.addFriendListLink.bind(this));
  },
//////////////////
  submitPost: function(event) {
    event.preventDefault();
    var that = this;
    var postBody = this.$('input').val();
    var post = new FacebookApp.Models.Post({
                    'author_id': FacebookApp.Models.currentUser.get('id'),
                    'body': postBody,
                    'receiver_id': this.model.get('id')
                    });
    post.save({},{
      success: function() {
        that.model.posts().add(post, {merge: true});
      }
    })
  },

  requestFriend: function(event) {
    event.preventDefault();
    var that = this;
    var request = new FacebookApp.Models.Request({
                    'requestor_id': FacebookApp.Models.currentUser.get('id'),
                    'requestee_id': this.model.id,
                    'status': 'pending'
                    });
    request.save({}, {
      success: function() {
        that.model.requests().add(request, {merge: true});
        that.model.set('friendStatus', 'pending');
        // that.renderRequestButtons(request); //change the "Add" button to "Pending Friend Request"
      }
    })
  },

  destroyPost: function(event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var id = $target.attr('data-id');
    var post = this.model.posts().get(id);
    post.destroy();
  },

  removeFriend: function(event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var id = $target.attr('data-id');
    //Remove from each others' friends collections
    this.model.friends().remove(FacebookApp.Models.currentUser);
    FacebookApp.Models.currentUser.friends().remove(this.model);
    //And then delete the request from the database by finding all incoming/outgoing requests
    //They "repeat" because the requestor and requestee ID's are mirrors of each other in incoming
    //and outgoing requests
    var all_requests = (this.model.requests().where({requestor_id: FacebookApp.Models.currentUser.get('id'), requestee_id: this.model.get('id')})).concat(
      this.model.requests().where({requestee_id: FacebookApp.Models.currentUser.get('id'), requestor_id: this.model.get('id')})
    );

    for(var i = 0; i < all_requests.length; i++) {
      all_requests[i].destroy();
    }
    this.model.set('friendStatus', 'none');
  }

})

// _.extend(FacebookApp.Views.UserShow.prototype, FacebookApp.Utils.OrdView);
