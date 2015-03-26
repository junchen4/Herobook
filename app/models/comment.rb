class Comment < ActiveRecord::Base
  include Likeable
  validates :body, :author_id, :post_id, presence: true

  belongs_to(
    :post,
    :class_name => 'Post',
    :foreign_key => :post_id
  )

  belongs_to(
    :author,
    :class_name => 'User',
    :foreign_key => :author_id
  )

  def find_author
    User.find(self.author_id)
  end

  def find_post
    Post.find(self.post_id)
  end

  def like_status(user)
    self.likes.each do |like|
      if like.author_id == user.id
        return "liked"
      end
    end
    "unliked"
  end

end
