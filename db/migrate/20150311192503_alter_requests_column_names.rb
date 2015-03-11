class AlterRequestsColumnNames < ActiveRecord::Migration
  def change
    rename_column :requests, :user_id, :requestor_id
    rename_column :requests, :friend_id, :requestee_id

  end
end
