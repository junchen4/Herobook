Herobook.Models.Request = Herobook.Models.NewsfeedItem.extend({
  urlRoot: "/requests",

  parse: function(response) {
    var d = new Date(Date.parse(response.updated_at));

    response.myDate = d;
    return response;
  }

})
