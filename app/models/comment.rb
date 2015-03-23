class Comment < ActiveRecord::Base
  validates :body, :author_id, :post_id, presence: true

  belongs_to(
    :post,
    :class_name => 'Post',
    :foreign_key => :post_id
  )

  def find_author
    User.find(self.author_id)
  end

  def find_post
    Post.find(self.post_id)
  end
end
