class AddUserIdToNotification < ActiveRecord::Migration
  def change
  	add_column :notifications, :user_id, :integer, index: true
  end
end
