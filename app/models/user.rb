class User < ApplicationRecord
  has_secure_password

  #5. make your test to pass with presence validation
  validates :email, presence: true , uniqueness: true #8. add the uniqueness validation
end
