class CreateSales < ActiveRecord::Migration[5.2]
  def change
    create_table :sales do |t|
      t.timestamp :date_sale
      t.string :payer_email
      t.string :address
      t.string :payment_type
      t.timestamp :date_payment
      t.timestamp :date_confirmation
      t.string :status

      t.timestamps
    end
  end
end
