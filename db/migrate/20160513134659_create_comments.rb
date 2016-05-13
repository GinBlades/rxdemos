class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.belongs_to :post, foreign_key: true
      t.string :name
      t.string :email, null: false
      t.string :body, null: false

      t.timestamps
    end
  end
end
