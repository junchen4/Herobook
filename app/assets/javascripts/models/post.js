FacebookApp.Models.Post = FacebookApp.Models.NewsfeedItem.extend({
  urlRoot: '/posts',

  comments: function() {
    if(!this._comments) {
      this._comments = new FacebookApp.Collections.Comments([], {post: this});
    }
    return this._comments;
  },

  likes: function() {
    if(!this._likes) {
      this._likes = new FacebookApp.Collections.Likes([], {post: this});
    }
    return this._likes;
  },

  parse: function(response) {
    if(response.comments) {
      this.comments().set(response.comments, {parse: true});
      delete response.comments;
    }

    if(response.likes) {
      this.likes().set(response.likes, {parse: true});
      delete response.likes;
    }

    var d = new Date(Date.parse(response.created_at));

    response.myDate = d;
    return response;
  }

})
