Herobook.Collections.Notifications = Backbone.Collection.extend({
  url: '/notifications',

  model: Herobook.Models.Notification
})

Herobook.Collections.notifications = new Herobook.Collections.Notifications();