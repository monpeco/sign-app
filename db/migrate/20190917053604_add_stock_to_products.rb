class AddStockToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :stock, :integer
    add_column :products, :reorder, :integer
  end
end
