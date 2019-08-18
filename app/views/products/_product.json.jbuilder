json.extract! product, :id, :code, :name, :price, :description, :date_added, :active, :deleted, :comment, :promo, :category_id, :created_at, :updated_at
json.url product_url(product, format: :json)
