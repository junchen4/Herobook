class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
    	t.string :type, null: false
    	t.integer :author_id, index: true
    	t.integer :receiver_id, index: true
    	t.integer :post_id, index: true
    	t.string :viewed, default: "false"
    end
  end
end
