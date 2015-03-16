class ChangePostsToAuthoredPosts < ActiveRecord::Migration
  def change
  	rename_table :posts, :authored_posts
  end
end
