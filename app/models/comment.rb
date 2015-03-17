class Comment < ActiveRecord::Base
  validates :body, :author_id, :post_id, presence: true

  belongs_to(
    :post,
    :class_name => 'Post',
    :foreign_key => :post_id
  )

end
