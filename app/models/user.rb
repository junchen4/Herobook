class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  after_initialize :ensure_session_token

  has_many(
    :posts,
    :class_name => "Post",
    :foreign_key => :author_id
  )

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
