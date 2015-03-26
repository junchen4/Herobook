json.extract! @post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
json.author @post.find_author, :email
json.receiver @post.find_receiver, :email

json.likesCount @post.likes_count
json.likeStatus @post.like_status(current_user)
json.likes @post.likes do |like|
	json.extract! like, :id, :author_id, :likeable_id, :likeable_type, :created_at, :updated_at
end

json.comments @post.comments do |comment|
	json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
	json.author comment.find_author, :email
	json.post comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
end
