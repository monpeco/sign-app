# ["id", "code", "name", "price", "description", "date_added", "active", "deleted", "comment", "promo", "category_id", "created_at", "updated_at"] 

class Product < ApplicationRecord
  belongs_to :category
  has_many :properties
  has_many_attached :images
end
