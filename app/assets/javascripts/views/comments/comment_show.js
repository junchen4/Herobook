FacebookApp.Views.CommentShow = Backbone.CompositeView.extend({
  template: JST['comments/show'],

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({comment: this.model, user: this.user});
    this.$el.html(content);
    return this;
  }


})
