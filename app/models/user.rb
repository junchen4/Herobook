class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  after_initialize :ensure_session_token

  has_many(
    :authored_posts,
    :class_name => "Post",
    :foreign_key => :author_id
  )

  has_many(
    :received_posts,
    :class_name => "Post",
    :foreign_key => :receiver_id
  )

  #"pending_requests" refers to requests that have been made to the current user
  # has_many(
  #   :pending_requests,
  #   :class_name => "Request",
  #   :foreign_key => :requestee_id
  # )
  #
  # has_many(
  #   :inverse_requests,
  #   :class_name => "Friendship",
  #   :foreign_key => :requestee_id
  # )
  #
  # has_many(
  #   :friends,
  #   :through => :requests,
  #   :source => :inverse_user
  # )

  def pending_requests
    binds = {id: self.id}
    Request.find_by_sql([<<-SQL, binds])
      SELECT requests.*
      FROM requests
      WHERE requests.requestee_id = :id AND requests.status = 'pending'
    SQL
  end

  def all_friends
    binds = {id: self.id}
    User.find_by_sql([<<-SQL, binds])
      SELECT users.*
      FROM requests AS incoming
      JOIN requests AS outgoing ON incoming.requestee_id = outgoing.requestor_id
      JOIN users ON outgoing.requestee_id = users.id OR incoming.requestor_id = users.id
      WHERE incoming.requestee_id = :id AND incoming.status = 'accepted'
      UNION
      SELECT users.*
      FROM requests
      JOIN users ON requests.requestee_id = users.id
      WHERE requests.requestor_id = :id AND requests.status = 'accepted'
      UNION
      SELECT users.*
      FROM requests
      JOIN users ON requests.requestor_id = users.id
      WHERE requests.requestee_id = :id AND requests.status = 'accepted'
    SQL
  end


  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil if user.nil? || !user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password) #string => stringified hash
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
    #new builds a Password object from an existing, stringified hash
  end

  private
  def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
