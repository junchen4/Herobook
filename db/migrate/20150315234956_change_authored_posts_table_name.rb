class ChangeAuthoredPostsTableName < ActiveRecord::Migration
  def change
  	rename_table :authored_posts, :posts
  end
end
