class Request < ActiveRecord::Base
  validates :requestor_id, :requestee_id, :status, presence: true

  belongs_to(
    :requestor,
    :class_name => "User",
    :foreign_key => :requestor_id
  )

  belongs_to(
    :requestee,
    :class_name => "User",
    :foreign_key => :requestee_id
  )

  def find_requestor
    User.find(self.requestor_id)
  end

  def find_requestee
    User.find(self.requestee_id)
  end

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
