FacebookApp.Views.SearchShow = Backbone.CompositeView.extend({
  template: JST['users/search_show'],

  initialize: function() {


  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    this.$input = this.$el.find("input[name=username]");
    this.$ul = this.$el.find(".users");
    this.$input.on("input", this.handleInput.bind(this));

    return this;
  },

  handleInput: function(event) {
    console.log("handling input");
    if(this.$input.val() == "") {
      this.renderResults([]);
      return;
    }

    $.ajax({
      url: "/users/search",
      dataType: "json",
      method: "GET",
      data: { query: this.$input.val() },
      success: this.renderResults.bind(this) //Passes what is returned from Rails side to the success function
    });
  },

  renderResults: function(users) {
    this.$ul.empty();
    console.log(users);
    for(var i = 0; i < users.length; i++) {
      var user = users[i];

      var $a = $("<a></a>");
      $a.text(user.email);
      $a.attr("href", "#/users/" + user.id);

      var $li = $("<li></li>");
      $li.append($a);
      this.$ul.append($li);
    }
  }

})
