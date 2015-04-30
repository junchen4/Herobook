class AddColumnsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :first_name, :string
  	add_column :users, :last_name, :string
  	add_column :users, :sex, :string
  	add_column :users, :relationship_status, :string
  	add_column :users, :education, :string
  	add_column :users, :employer, :string
  	add_column :users, :hometown, :string
  	add_column :users, :current_city, :string
  	add_column :users, :about_me, :text

  	add_index :users, :first_name
  	add_index :users, :last_name

  end
end
