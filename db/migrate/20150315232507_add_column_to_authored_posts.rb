class AddColumnToAuthoredPosts < ActiveRecord::Migration
  def change
  	add_column :authored_posts, :receiver_id, :integer
  end
end
