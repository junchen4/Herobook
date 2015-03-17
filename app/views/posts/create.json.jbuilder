json.extract! @post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
json.author @author, :email
json.comments @post.comments do |comment|
	json.extract! comment, :id, :body, :post_id, :created_at, :updated_at
	json.author comment.find_author, :email
end
