Herobook.Models.Notification = Backbone.Model.extend({
  urlRoot: "/notifications",

  parse: function(response) {
    var d = new Date(Date.parse(response.updated_at));

    response.myDate = d;
    return response;
  }

})