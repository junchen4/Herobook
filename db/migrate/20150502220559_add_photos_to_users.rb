class AddPhotosToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :profile_photo, :string
  	add_column :users, :cover_photo, :string
  end
end
