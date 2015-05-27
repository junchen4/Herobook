class FixTypeColumnInNotifications < ActiveRecord::Migration
  def change
  	rename_column :notifications, :type, :class_name
  end
end
