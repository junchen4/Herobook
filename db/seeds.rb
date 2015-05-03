# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email: "a@a.com", password: "password", first_name: "Abe", last_name: "Lincoln")
User.create(email: "b@b.com", password: "password", first_name: "Billy", last_name: "Bobby")
User.create(email: "c@c.com", password: "password", first_name: "Christian", last_name: "Goozer")
User.create(email: "d@d.com", password: "password", first_name: "Dylan", last_name: "Mahoney")

Post.create(body: "hi", author_id: 2, receiver_id: 1)
Post.create(body: "hi", author_id: 1, receiver_id: 2)
Post.create(body: "hi", author_id: 2, receiver_id: 4)

Request.create(requestor_id: 1, requestee_id: 2, status: "accepted")
Request.create(requestor_id: 2, requestee_id: 4, status: "accepted")
