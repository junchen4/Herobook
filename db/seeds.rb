User.create(email: "tstark@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/XLq1ZbwRdirvLJXTPaCx", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Tony", last_name: "Stark", sex: "Male", relationship_status: "In a Relationship", education: "MIT", hometown: "Long Island", current_city: "New York, NY", about_me: "Just another billionaire")
User.create(email: "bwayne@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/ubTltElMQx5rmFVpVLLh", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Bruce", last_name: "Wayne", sex: "Male", relationship_status: "Single", hometown: "Gotham", current_city: "Gotham", about_me: "I'm that guy that Gotham needs, but doesn't deserve.")
User.create(email: "pparker@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/ueN5VymqSOyCgxVdc6nm", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Peter", last_name: "Parker", sex: "Male", relationship_status: "It's Complicated",  about_me: "My spidey senses are tingling!")
User.create(email: "thor@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/j3RrgU2Rs2mkW907cR9Q", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Thor", last_name: "Odinson", sex: "Male", relationship_status: "In a Relationship", hometown: "Asgard", current_city: "Asgard", about_me: "I am Thor. I am nothing like my brother.")
User.create(email: "blackwidow@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/7izCvQOJRPyGccXzWXSc", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Natalia", last_name: "Romanova", sex: "Female", relationship_status: "Single", current_city: "New York, NY", about_me: "Not much to say...?")
User.create(email: "mhill@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/3MS5CbpTsefFQ68LeaVg", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Maria", last_name: "Hill", sex: "Female", relationship_status: "Single", current_city: "New York, NY", about_me: "Former SHIELD employee")
User.create(email: "bbanner@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/7HqflNbpTze2DhegOYBO", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Bruce", last_name: "Banner", sex: "Male", relationship_status: "Single", about_me: "Anger management counseling isn't working for me a.t.m.")
User.create(email: "srogers@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/y5CAbiDiSOyV8KuaE6gP", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Steve", last_name: "Rogers", sex: "Male", relationship_status: "Single", education: "Life", hometown: "Brooklyn, NY", current_city: "Washington D.C.", about_me: "I'm the best-looking 90+ year-old around. Saving lives while looking good.")
User.create(email: "lskysky@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/xWf8qnSgTyyfcC6Ywu84", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Luke", last_name: "Skywalker", sex: "Male", relationship_status: "In a Relationship", about_me: "I've had a weird life.")
User.create(email: "mmurdock@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/kJe7UJViSfm6q76FJvHd", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Matt", last_name: "Murdock")
User.create(email: "lhowlett@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/zjY4KT1UQAGdfmzCrYHJ", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Logan", last_name: "Howlett")
User.create(email: "jgrey@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/eS3Mzk6R7G6Wf8o4rD5W", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Jean", last_name: "Grey")
User.create(email: "vader@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/VReMsa0FSFuCutYeB32W", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Anakin", last_name: "Skywalker", sex: "Male", relationship_status: "In a Relationship", education: "Jedi", about_me: "I haven't been the nicest guy around. Tryna change that...")
User.create(email: "yoda@url.com", password: "password", profile_photo: "https://www.filepicker.io/api/file/hCF63nsHTtuo8tzGB7rV", cover_photo: "https://www.filepicker.io/api/file/hGJ2WrjcTO21jyt9bu34", first_name: "Yoda", last_name: "", sex: "Male", relationship_status: "Single")

###################
Request.create(requestor_id: 1, requestee_id: 2, status: "accepted")
Request.create(requestor_id: 1, requestee_id: 4, status: "accepted")
Request.create(requestor_id: 1, requestee_id: 5, status: "accepted")
Request.create(requestor_id: 1, requestee_id: 7, status: "accepted")

Request.create(requestor_id: 8, requestee_id: 1, status: "accepted")
Request.create(requestor_id: 8, requestee_id: 2, status: "accepted")
Request.create(requestor_id: 8, requestee_id: 3, status: "accepted")
Request.create(requestor_id: 8, requestee_id: 4, status: "accepted")
Request.create(requestor_id: 8, requestee_id: 5, status: "accepted")
Request.create(requestor_id: 8, requestee_id: 6, status: "accepted")
Request.create(requestor_id: 8, requestee_id: 7, status: "accepted")
Request.create(requestor_id: 9, requestee_id: 8, status: "pending")
Request.create(requestor_id: 10, requestee_id: 8, status: "pending")
Request.create(requestor_id: 11, requestee_id: 8, status: "pending")

Request.create(requestor_id: 9, requestee_id: 13, status: "accepted")

Request.create(requestor_id: 14, requestee_id: 1, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 2, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 3, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 4, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 5, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 6, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 8, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 11, status: "accepted")
Request.create(requestor_id: 14, requestee_id: 13, status: "accepted")
###################
Post.create(body: "Hey Stark, can I borrow $100mil? Promise I'll pay you back ASAP", author_id: 8, receiver_id: 1)
Post.create(body: "Nananananananaan BATMAN!!!", author_id: 2, receiver_id: 8)
Post.create(body: "Why aren't you responding to my texts???", author_id: 6, receiver_id: 8)
Post.create(body: "You got serious anger problems bro", author_id: 8, receiver_id: 7)

Request.create(requestor_id: 5, requestee_id: 4, status: "accepted")

Post.create(body: "Can I borrow Alfred for the weekend? Had a party here last night and need cleaning up", author_id: 1, receiver_id: 2)
Post.create(body: "ETA to Earth: 10 hours. Let's hang.", author_id: 4, receiver_id: 1)

Post.create(body: "Dad, can I get the plans for the Death Star?", author_id: 9, receiver_id: 13)

Request.create(requestor_id: 3, requestee_id: 4, status: "accepted")

Post.create(body: "Pretentious to wear my uniform on an international flight?", author_id: 8, receiver_id: 8)
Post.create(body: "Chillin' in Chile.", author_id: 8, receiver_id: 8)
Post.create(body: "I'm too cool even on this hot summer day.", author_id: 1, receiver_id: 1)
Post.create(body: "...a bit underwhelming, the Mayweather-Pacquiao fight was.", author_id: 14, receiver_id: 14)

###################
Comment.create(post_id: 1, author_id: 1, body: "Sure friend!")

Comment.create(post_id: 2, author_id: 8, body: "Dude get a life.")
Comment.create(post_id: 2, author_id: 2, body: "I'm....BATMAN!")

Request.create(requestor_id: 5, requestee_id: 6, status: "accepted")

Comment.create(post_id: 3, author_id: 8, body: "Got kinda busy this weekend. Too busy 'mirin myself in the mirror.")
Comment.create(post_id: 3, author_id: 6, body: "Ugh, it's over.")
Comment.create(post_id: 3, author_id: 8, body: "Cool story bro.")
Comment.create(post_id: 3, author_id: 6, body: "Hang out tomorrow?")

Request.create(requestor_id: 11, requestee_id: 12, status: "accepted")

###################
Like.create(likeable_type: "Post", likeable_id: 1, author_id: 8)
Like.create(likeable_type: "Post", likeable_id: 1, author_id: 4)

Like.create(likeable_type: "Post", likeable_id: 5, author_id: 8)
Like.create(likeable_type: "Post", likeable_id: 5, author_id: 7)
Like.create(likeable_type: "Comment", likeable_id: 2, author_id: 10)




