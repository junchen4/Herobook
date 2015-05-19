Herobook.Views.InfoShow = Backbone.CompositeView.extend({
  template: JST['users/info_show'],

  events: {
    'click button.edit':'editInfo',
    'click .save': 'saveInfo'
  },

  tagName: "section",

  className: "about",


  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    if (Herobook.Models.currentUser.get('id') === this.model.get('id')) {
      this.listenTo(this.model.requests(), 'add remove', this.renderRequests);
    }
    this.listenTo(this.model.friends(), 'add remove', this.renderFriendList);
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },

  editInfo: function (event) {
    event.preventDefault();
    var attr = $(event.currentTarget).data("attr");
    $("." + "show-" + attr).toggleClass("hidden");
    $("." + "form-" + attr).toggleClass("hidden");
  },

  saveInfo: function(event) {
    event.preventDefault();
    var attr = $(event.currentTarget).data("attr");
    console.log(attr);
    $("." + "show-" + attr).toggleClass("hidden");
    $("." + "form-" + attr).toggleClass("hidden");
    if (attr === "about_me") {
      var value = this.$('textarea.' + attr).val();
    } else {
      var value = this.$('input.' + attr).val();
    }
    console.log(value);
    this.model.set(attr, value);
    this.render();
    var model = {"user": this.model.attributes};
    console.log(this.model);
    $.ajax({
      url: "/users/" + this.model.get('id'),
      type: "PUT",
      dataType: "json",
      data: model
    });
  }

})

