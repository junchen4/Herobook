FacebookApp.Views.PostsShow = Backbone.View.extend({
  template: JST['posts/show'],


  render: function() {
    var content = this.template({posts: this.collection, user: this.model});
    this.$el.html(content);
    return this;
  }

})
