class Request < ActiveRecord::Base
  validates :requestor_id, :requestee_id, :status, presence: true

  # belongs_to(
  #   :requested_user,
  #   :class_name => "User",
  #   :foreign_key => :requestee_id
  # )
  #
  # belongs_to(
  #   :inverse_user,
  #   :class_name => "User",
  #   :foreign_key => :friend_id
  # )

end
