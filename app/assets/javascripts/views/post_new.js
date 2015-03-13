FacebookApp.Views.PostNew = Backbone.View.extend({
  template: JST['posts/new'],

  render: function() {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  }
})
