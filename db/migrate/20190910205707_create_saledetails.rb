class CreateSaledetails < ActiveRecord::Migration[5.2]
  def change
    create_table :saledetails do |t|
      t.integer :quantity
      t.float :price
      t.references :product, foreign_key: true
      t.references :sale, foreign_key: true

      t.timestamps
    end
  end
end
