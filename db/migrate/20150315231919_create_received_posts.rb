class CreateReceivedPosts < ActiveRecord::Migration
  def change
    create_table :received_posts do |t|

      t.timestamps
    end
  end
end
