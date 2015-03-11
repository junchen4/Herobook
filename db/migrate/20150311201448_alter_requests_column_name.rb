class AlterRequestsColumnName < ActiveRecord::Migration
  def change
    remove_column :requests, :accepted
    add_column :requests, :status, :string
  end
end
