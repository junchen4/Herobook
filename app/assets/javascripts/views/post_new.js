FacebookApp.Views.PostNew = Backbone.View.extend({
  template: JST['posts/new'],

  initialize: function() {
    
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})
