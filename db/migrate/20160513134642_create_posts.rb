class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.string :title, null: false
      t.string :body, null: false

      t.timestamps
    end
  end
end
