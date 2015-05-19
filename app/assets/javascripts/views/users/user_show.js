Herobook.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  events: {
    'click .request-friend':'requestFriend',
    'click button.remove-friend': 'removeFriend',
    'click .content-profile-sidebar-links a': 'changePanel',
    "click #account-nav": "toggleAccountNav",
    "click": "hideAccountNav",
    "click .change-profile-photo": "changeProfilePhoto",
    "click .change-cover-photo": "changeCoverPhoto",
    "click .logout": "logout"
  },

  initialize: function(options) {
    this.feed = options.feed;
    this.posts = options.posts;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.posts, 'sync', this.renderPosts);
    this.listenTo(this.posts, 'add', this.addPost);
    this.listenTo(this.posts, 'remove', this.removePost);
    if (Herobook.Models.currentUser.get('id') === this.model.get('id')) {
      this.listenTo(this.model.requests(), 'add remove', this.renderRequests);
    }
    this.listenTo(this.model.friends(), 'add remove', this.renderFriendList);
    this.listenTo(this.model, 'change:friendStatus', this.render);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.renderPostForm();
    this.renderPosts();
  
    this.renderSearch();
    if (Herobook.Models.currentUser.get('id') === this.model.get('id')) {
      this.renderRequests();
      console.log("requests",this.model.requests());
    }
    if (Herobook.Models.currentUser.get('id') !== this.model.get('id')) {
      this.renderRequestButtons();
    }
    this.activePanel = ".wall";
    var infoShow = new Herobook.Views.InfoShow({model: this.model});
    this.$('.content-profile-main').append(infoShow.render().$el);

    var friendListShow = new Herobook.Views.FriendListShow({model: this.model});
    this.$('.content-profile-main').append(friendListShow.render().$el);

    this.makeActive(this.activePanel);
    return this;
  },

//////////

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

///////////

  changePanel: function (event) {
    event.preventDefault();
    this.makeActive($(event.currentTarget).data("tab"));
  },

  makeActive: function (panel) {
    this.activePanel = panel;
    this.$(".content-profile-main > section").addClass("hidden");
    this.$(panel).removeClass("hidden");
    this.$(".content-profile-sidebar-links > li").removeClass("activated");
    this.$(panel + "-tab").addClass("activated");
  },

/////////////

  renderSearch: function() {
    var searchShowView = new Herobook.Views.SearchShow();
    this.$('.content-search').html(searchShowView.render().$el);
  },

  renderPostForm: function() {
    var postFormView = new Herobook.Views.PostForm({user: this.model, posts: this.posts, feed: this.feed});
    this.$('.post-form-area').html(postFormView.render().$el);
  },
///////////////////
  removePost: function(post) {
    if (this.model.get('friendStatus') === "accepted") {
      var subviewToRemove = _.findWhere(this.subviews('.posts'), {model: post});
      this.removeSubview('.posts', subviewToRemove);
    }
  },

  addPost: function(post) {
    if (this.model.get('friendStatus') === "accepted") {
      var lastComment = new Herobook.Models.Comment();

      //Set the last comment in a post, if the last comment exists
      if (post.comments().length !== 0) {
        lastComment.set(post.comments().at(post.comments().length - 1).attributes);
      }
      var author = Herobook.Collections.users.get(post.get('author_id'));
      var receiver = Herobook.Collections.users.get(post.get('receiver_id'));

      var postShowView = new Herobook.Views.PostShow({model: post, posts: this.posts, user: this.model, feed: this.feed, author: author, receiver: receiver, isFeed: false, lastComment: lastComment});
      this.addSubview('.posts', postShowView, false);
    }
  },

  renderPosts: function() {
    if (this.model.get('friendStatus') === "accepted") {
      this.emptySubviewContainer('.posts');
      this.posts.each(this.addPost.bind(this));
    }
  },
//////////////////
  addRequest: function(request) {
    var that = this;
    var requestor = Herobook.Collections.users.get(request.get('requestor_id')); 
    var requestShowView = new Herobook.Views.RequestShow({
                      requestor: requestor,
                      model: request,
                      collection: that.model.requests(),
                      });
    that.addSubview('.friend-requests', requestShowView);

  },

  renderRequests: function() {
    this.emptySubviewContainer('.friend-requests');
    this.model.requests().each(this.addRequest.bind(this));
  },
//////////////////
  renderRequestButtons: function(request) {
    this.emptySubviewContainer('.request-buttons');
    var requestButtonView = new Herobook.Views.RequestButton({
      model: request,
      collection: this.model.requests(),
      user: this.model
    });
    this.addSubview('.request-buttons', requestButtonView);
  },


  requestFriend: function(event) {
    event.preventDefault();
    var that = this;
    var request = new Herobook.Models.Request({
                    'requestor_id': Herobook.Models.currentUser.get('id'),
                    'requestee_id': this.model.id,
                    'status': 'pending'
                    });
    request.save({}, {
      success: function() {
        that.model.requests().add(request, {merge: true});
        that.model.set('friendStatus', 'pending');
      }
    })
  },

  removeFriend: function(event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    var id = $target.attr('data-id');
    //Remove from each others' friends collections
    this.model.friends().remove(Herobook.Models.currentUser);
    Herobook.Models.currentUser.friends().remove(this.model);
    //And then delete the request from the database by finding all incoming/outgoing requests
    //They "repeat" because the requestor and requestee ID's are mirrors of each other in incoming
    //and outgoing requests
    var all_requests = (this.model.requests().where({requestor_id: Herobook.Models.currentUser.get('id'), requestee_id: this.model.get('id')})).concat(
      this.model.requests().where({requestee_id: Herobook.Models.currentUser.get('id'), requestor_id: this.model.get('id')})
    );
    var that = this;
    for(var i = 0; i < all_requests.length; i++) {
      all_requests[i].destroy({
        success: function () {
          that.model.set('friendStatus', 'none');  
        }
      });
    }
  },

  changeCoverPhoto: function (event) {
    var that = this;
    filepicker.pick(
      {
        mimetypes: ['image/*'],
        services: ['COMPUTER']
      },
      function (blob) {
        that.model.set('cover_photo', blob.url);
        var model = {"user": that.model.attributes};
        $.ajax({
          url: "/users/" + that.model.get('id'),
          type: "PUT",
          dataType: "json",
          data: model, 
          success: function () {
            that.render();
          }
        });
      }
    );
  },

  changeProfilePhoto: function (event) {
    var that = this;
    filepicker.pick(
      {
        mimetypes: ['image/*'],
        services: ['COMPUTER']
      },
      function (blob) {
        that.model.set('profile_photo', blob.url);
        var model = {"user": that.model.attributes};
        $.ajax({
          url: "/users/" + that.model.get('id'),
          type: "PUT",
          dataType: "json",
          data: model,
          success: function () {
            that.render();
          }
        });
      }
    );
  },

logout: function () {
     $.ajax({
      type: "DELETE",
      url: "/session",
      success: function () {
        window.location.href = 'http://my-herobook.herokuapp.com/';
      }
    });
  }

})
