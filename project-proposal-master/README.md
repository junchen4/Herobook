# MyFacebook

[Heroku link][heroku]

[heroku]: http://facebook_clone.herokuapp.com

## Minimum Viable Product
MyFacebook is a clone of Facebook built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create posts
- [ ] Edit posts
- [ ] View a feed of friends' posts
- [ ] Search for users by name
- [ ] Add friends


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Account Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create accounts using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Creating and Editing Posts (~2 days)
I will add API routes to serve post data as JSON, then add Backbone
models and collections that fetch data from those routes. I will use 'PostForm' and
'PostShow' views. By the end of this phase, users will be able to view and edit
posts, all inside a single Backbone app. Look into using Markdown and other third-party
libraries to add functionality to views.

[Details][phase-two]

### Phase 3: Adding, Viewing, and Editing Comments (~2 days)
I will add API routes to serve post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this phase,
users will be able to add (create), view, and edit comments.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`friends` association to serve a list of posts (and their comments) ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `posts`
collection fetches from the new route.  Ultimately, this will be the page users
see after logging in.

[Details][phase-four]

### Phase 5: Searching for Friends (~2 days)
I'll add `search` routes to the Posts controller. On the
Backbone side, there will be a `SearchResults` composite view that has a `PostsIndex` subview. These views will use a 'friends` collection, but they will fetch from the new `search` routes.
Users can "add" friends.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Public/private options
- [ ] Display friend lists
- [ ] "Like" button for posts
- [ ] Pagination/infinite scroll
- [ ] Tag friends in posts
- [ ] Activity history (e.g. likes, taggings)
- [ ] Post types (image posts, quote posts, etc)
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead search bar
- [ ] OkCupid-like features

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
