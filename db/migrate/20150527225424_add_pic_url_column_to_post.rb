class AddPicUrlColumnToPost < ActiveRecord::Migration
  def change
  	add_column :posts, :picture_url, :string
  end
end
