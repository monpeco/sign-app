class AddUpdateStockTrigger < ActiveRecord::Migration[5.2]
  def up
    execute <<-SQL
      CREATE OR REPLACE FUNCTION fn_update_stock()
        RETURNS trigger AS
      $BODY$
      BEGIN
        UPDATE products SET stock = stock - NEW.quantity
        WHERE id = NEW.product_id;
        RETURN NEW;
      END
      $BODY$
      language plpgsql;

      CREATE TRIGGER tg_update_stock
           AFTER INSERT ON saledetails
           FOR EACH ROW
           EXECUTE PROCEDURE fn_update_stock();
    SQL
  end

  def down
    execute <<-SQL
      DROP TRIGGER tg_update_stock ON saledetails;

      DROP FUNCTION fn_update_stock();
    SQL
  end
end
