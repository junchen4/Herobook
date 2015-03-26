class Like < ActiveRecord::Base
  validates :author_id, presence: true, uniqueness: { scope: [:likeable_id, :likeable_type]}

  belongs_to :likeable, polymorphic: true

  belongs_to(
    :author,
    :class_name => "User",
    :foreign_key => :author_id
  )

end
