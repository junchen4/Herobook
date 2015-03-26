class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :author_id, null: false
      t.references :likeable, polymorphic: true, index: true

      t.timestamps
    end
  end
end
