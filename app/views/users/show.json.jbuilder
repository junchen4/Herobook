json.extract! @user, :id, :email, :first_name, :last_name, :sex, :relationship_status, :education, :employer, :hometown, :current_city, :about_me, :profile_photo, :cover_photo, :password_digest, :session_token, :created_at, :updated_at

json.comments @user.comments do |comment|
	json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
end

json.authoredPosts @user.authored_posts do |post|

	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
	json.author post.find_author, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
	json.receiver post.find_receiver, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
	json.likesCount post.likes_count
	json.likeStatus post.like_status(current_user)
	json.likes post.likes do |like|
		json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
	end

	json.comments post.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
		json.author comment.find_author, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
		json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.likeStatus comment.like_status(@current_user)
		json.likes comment.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end

end

json.receivedPosts @user.received_posts do |post|
	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
	json.author post.find_author, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
	json.receiver post.find_receiver, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
	json.likesCount post.likes_count
	json.likeStatus post.like_status(current_user)
	json.likes post.likes do |like|
		json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
	end

	json.comments post.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
		json.author comment.find_author, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
		json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.likeStatus comment.like_status(@current_user)
		json.likes comment.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
end

json.outgoingRequests @user.outgoing_requests do |request|
	json.extract! request, :id, :requestor_id, :requestee_id, :created_at, :updated_at, :status
	json.requestor request.find_requestor, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
end

json.incomingRequests @user.incoming_requests do |request|
	json.extract! request, :id, :requestor_id, :requestee_id, :created_at, :updated_at, :status
	json.requestor request.find_requestor, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
end

json.allFriends @all_friends do |friend|
	json.extract! friend, :id, :email, :first_name, :last_name, :sex, :relationship_status, :education, :employer, :hometown, :current_city, :about_me, :profile_photo, :cover_photo, :password_digest, :session_token, :created_at, :updated_at	

	json.comments friend.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
	end
	json.receivedPosts friend.received_posts do |post|
		json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.author post.find_author, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
		json.receiver post.find_receiver, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
		json.likesCount post.likes_count
		json.likeStatus post.like_status(current_user)

		json.likes post.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
	json.authoredPosts friend.authored_posts do |post|
		json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.author post.find_author, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
		json.receiver post.find_receiver, :id, :email, :first_name, :last_name, :profile_photo, :cover_photo
		json.likesCount post.likes_count
		json.likeStatus post.like_status(current_user)

		json.likes post.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
end

json.likes @user.likes do |like|
	json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
end

json.friendStatus @user.friendStatus(current_user)
