json.extract! @user, :id, :email, :password_digest, :session_token, :created_at, :updated_at

json.authoredPosts @user.authored_posts do |post|
	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
end

json.receivedPosts @user.received_posts do |post|
	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
end