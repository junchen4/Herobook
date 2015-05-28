json.array!(@comments) do |comment|
	json.extract! comment, :id, :author_id, :body, :post_id, :created_at, :updated_at
	json.author comment.find_author, :email
	json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
	json.likeStatus comment.like_status(current_user)
	json.likes comment.likes do |like|
	  json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
	end
end
