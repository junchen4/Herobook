json.extract! @comment, :id, :author_id, :body, :post_id, :created_at, :updated_at
json.author @comment.find_author, :email
json.post @comment.find_post, :id, :body, :author_id, :receiver_id, :created_at, :updated_at
