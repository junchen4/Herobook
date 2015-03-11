class RenameFriendshipsToRequests < ActiveRecord::Migration
  def change
    rename_table :friendships, :requests
  end
end
