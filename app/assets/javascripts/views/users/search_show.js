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
    if(this.$input.val() == "") {
      this.renderResults([]);
      return;
    }

    var isFullName = false;
    var firstName = "";
    var lastName = "";
    for(var i = 0; i < this.$input.val().length; i++) {
      if (this.$input.val()[i] == " ") {
        isFullName = true;
        firstName = this.$input.val().slice(0, i);
        lastName = this.$input.val().slice(i + 1, this.$input.val().length);
        break;
      }
    }

    if (isFullName === false) {
      var dataInfo = { query: this.$input.val(), isFullName: isFullName };
    } else {
      var dataInfo = { firstName: firstName, lastName: lastName, isFullName: isFullName };
    }

    $.ajax({
      url: "/users/search",
      dataType: "json",
      method: "GET",
      data: dataInfo,
      success: this.renderResults.bind(this) //Passes what is returned from Rails side to the success function
    });
  },

  renderResults: function(users) {
    this.$ul.empty();
    for(var i = 0; i < users.length; i++) {
      var user = users[i];

      var $a = $("<a></a>");
      $a.text(user.first_name + " " + user.last_name);
      $a.attr("href", "#/users/" + user.id);

      var $li = $("<li></li>");
      $li.append($a);
      this.$ul.append($li);
    }
  }

})
