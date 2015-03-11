class AddAcceptedColumnToRequests < ActiveRecord::Migration
  def change
    add_column :requests, :accepted, :boolean
  end
end
