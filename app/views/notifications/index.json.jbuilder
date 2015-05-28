json.array!(@notifications) do |notification|
	if notification.class_name == 'Post'
		json.extract! notification, :id, :class_name, :author_id, :receiver_id, :post_id, :viewed, :created_at, :updated_at
		json.author User.find(notification.author_id), :first_name, :last_name
		json.receiver User.find(notification.receiver_id), :first_name, :last_name
		json.post Post.find(notification.post_id), :body

	elsif notification.class_name == 'Request'
		json.extract! notification, :id, :class_name, :author_id, :receiver_id, :post_id, :viewed, :created_at, :updated_at
		json.receiver User.find(notification.receiver_id), :first_name, :last_name
	
	elsif notification.class_name == 'Comment'
		json.extract! notification, :id, :class_name, :author_id, :receiver_id, :post_id, :viewed, :created_at, :updated_at
		json.author User.find(notification.author_id), :first_name, :last_name

	elsif notification.class_name == 'Post Like'
		json.extract! notification, :id, :class_name, :author_id, :receiver_id, :post_id, :viewed, :created_at, :updated_at
		json.author User.find(notification.author_id), :first_name, :last_name
		json.body Post.find(notification.post_id), :body
	
	elsif notification.class_name == 'Comment Like'
		json.extract! notification, :id, :class_name, :author_id, :receiver_id, :post_id, :viewed, :created_at, :updated_at
		json.author User.find(notification.author_id), :first_name, :last_name
	end

end