FacebookApp.Models.Request = FacebookApp.Models.NewsfeedItem.extend({
  urlRoot: "/requests",

  parse: function(response) {
    var d = new Date(Date.parse(response.created_at));

    response.myDate = d;
    return response;
  }

})
