class Product < ApplicationRecord
  belongs_to :category
  has_many :properties
  has_many_attached :images
end
