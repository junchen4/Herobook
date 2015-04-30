class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  # validates :first_name, :last_name, :sex, :relationship_status, :education, :employer, :hometown, :current_city, :about_me
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  after_initialize :ensure_session_token

  has_many(
    :authored_posts,
    :class_name => "Post",
    :foreign_key => :author_id,
    :dependent => :destroy
  )

  has_many(
    :received_posts,
    :class_name => "Post",
    :foreign_key => :receiver_id,
    :dependent => :destroy
  )

  has_many(
    :comments,
    :class_name => "Comment",
    :foreign_key => :author_id,
    :dependent => :destroy
  )

  has_many(
    :outgoing_requests,
    :class_name => "Request",
    :foreign_key => :requestor_id,
    :dependent => :destroy
  )

  has_many(
    :incoming_requests,
    :class_name => "Request",
    :foreign_key => :requestee_id,
    :dependent => :destroy
  )

  has_many(
    :likes,
    :class_name => "Like",
    :foreign_key => :author_id,
    :dependent => :destroy
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
  def feed_posts
    posts = []

    self.all_friends.each do |friend|
      friend.authored_posts.each do |post|
        posts << post
        # posts << post if post.include?(friend.received_posts)
      end
      friend.received_posts.each do |post|
        posts << post
      end
    end

    self.authored_posts.each do |post|
      posts << post
    end

    self.received_posts.each do |post|
      posts << post
    end

    posts.uniq!
    posts
  end

  # def feed_commented_posts
  #   posts = []
  #
  #   self.comments.each do |comment|
  #     posts << Post.find(comment.post_id)
  #   end
  #
  #   self.all_friends.each do |friend|
  #     friend.comments.each do |comment|
  #       posts << Post.find(comment.post_id) if self.all_friends.include?(User.find(comment.post_id))
  #     end
  #   end
  #
  #   posts.uniq!
  #   posts
  # end

  def feed_friend_acceptances
    acceptances = []
    self.requests.each do |request|
      acceptances << request  if request.status == "accepted"
    end

    self.all_friends.each do |friend|
      friend.requests.each do |request|
        acceptances << request if request.status == "accepted"
      end
    end

    acceptances.uniq!
    acceptances
  end

  def friendStatus(user)
    request = self.requests.find do |request|
      user.id == request.requestor_id || user.id == request.requestee_id
    end
    if request
      request.status
    else
      nil
    end
  end

  def requests
    binds = {id: self.id}
    Request.find_by_sql([<<-SQL, binds])
      SELECT requests.*
      FROM requests
      WHERE requests.requestee_id = :id OR requests.requestor_id = :id
    SQL
  end

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
