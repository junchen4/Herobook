class Post < ActiveRecord::Base
  include Likeable
  validates :body, :author_id, :receiver_id, presence: true

  has_many(
    :comments,
    :class_name => 'Comment',
    :foreign_key => :post_id
  )

  belongs_to(
    :author,
    :class_name => "User",
    :foreign_key => :author_id
  )

  belongs_to(
    :receiver,
    :class_name => "User",
    :foreign_key => :receiver_id
  )

  #For usage in JBuilder to determine author of post
  def find_author
    User.find(self.author_id)
  end

  def find_receiver
    User.find(self.receiver_id)
  end
end
