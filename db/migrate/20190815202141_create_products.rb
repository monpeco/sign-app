class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :code
      t.string :name
      t.float :price
      t.text :description
      t.timestamp :date_added
      t.boolean :active
      t.boolean :deleted
      t.string :comment
      t.string :promo
      t.references :category, foreign_key: true

      t.timestamps
    end
    add_index :products, :code, unique: true
    add_index :products, :name, unique: true
  end
end
