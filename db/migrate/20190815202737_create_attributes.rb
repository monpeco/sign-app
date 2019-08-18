class CreateAttributes < ActiveRecord::Migration[5.2]
  def change
    create_table :attributes do |t|
      t.string :name
      t.string :value
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
