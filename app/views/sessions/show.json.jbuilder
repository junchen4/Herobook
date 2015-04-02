json.extract! @current_user, :id, :email, :password_digest, :session_token, :created_at, :updated_at

json.comments @current_user.comments do |comment|
	json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
end

json.authoredPosts @current_user.authored_posts do |post|
	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
	json.author post.find_author, :email
	json.receiver post.find_receiver, :email
	json.likesCount post.likes_count
	json.likeStatus post.like_status(@current_user)
	json.likes post.likes do |like|
		json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
	end
	json.comments post.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
		json.author comment.find_author, :email
		json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.likeStatus comment.like_status(@current_user)
		json.likes comment.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
end

json.receivedPosts @current_user.received_posts do |post|
	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
	json.author post.find_author, :email
	json.receiver post.find_receiver, :email
	json.likesCount post.likes_count
	json.likeStatus post.like_status(@current_user)

	json.likes post.likes do |like|
		json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
	end
	json.comments post.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
		json.author comment.find_author, :email
		json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.likeStatus comment.like_status(@current_user)
		json.likes comment.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
end

json.outgoingRequests @current_user.outgoing_requests do |request|
	json.extract! request, :id, :requestor_id, :requestee_id, :created_at, :updated_at, :status
	json.requestor request.find_requestor, :email
end

json.incomingRequests @current_user.incoming_requests do |request|
	json.extract! request, :id, :requestor_id, :requestee_id, :created_at, :updated_at, :status
	json.requestor request.find_requestor, :email
end

json.allFriends @all_friends do |friend|
	json.extract! friend, :id, :email, :password_digest, :session_token, :created_at, :updated_at

	json.comments friend.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
	end

	json.receivedPosts friend.received_posts do |post|
		json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.author post.find_author, :email
		json.receiver post.find_receiver, :email
		json.likesCount post.likes_count
		json.likeStatus post.like_status(@current_user)

		json.likes post.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
	json.authoredPosts friend.authored_posts do |post|
		json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.author post.find_author, :email
		json.receiver post.find_receiver, :email
		json.likesCount post.likes_count
		json.likeStatus post.like_status(@current_user)

		json.likes post.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
end

json.likes @current_user.likes do |like|
	json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
end

json.newsfeedPosts @current_user.newsfeed_posts do |post|
	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
	json.author post.find_author, :email
	json.receiver post.find_receiver, :email
	json.likesCount post.likes_count
	json.likeStatus post.like_status(@current_user)

	json.likes post.likes do |like|
		json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
	end

	json.comments post.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
		json.author comment.find_author, :email
		json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.likeStatus comment.like_status(@current_user)
		json.likes comment.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
end

json.newsfeedCommentedPosts @current_user.newsfeed_commented_posts do |post|
	json.extract! post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
	json.author post.find_author, :email
	json.receiver post.find_receiver, :email
	json.likesCount post.likes_count
	json.likeStatus post.like_status(@current_user)

	json.likes post.likes do |like|
		json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
	end

	json.comments post.comments do |comment|
		json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
		json.author comment.find_author, :email
		json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
		json.likeStatus comment.like_status(@current_user)
		json.likes comment.likes do |like|
			json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
		end
	end
end
