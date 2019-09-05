require 'rails_helper'

#0. Important! always run your tests from the app folder, like:
#     rspec spec/models/user_spec.rb

RSpec.describe User, type: :model do
  context 'validation test' do
    # 1. write the most basic model test, the happy case 
    it 'Should save successfully' do
      user = User.new(email: "sample@example.com", 
                      password: "sample",
                      user_type: "normal", 
                      active: true, 
                      comment: "simple").save
      expect(user).to eq(true)
    end
    
    #2. make sure that you have a running test (it doesn't matter if fails)
    #3. make sure that your test pass (in the fist test should be trivial)

    #4. write a non-trivial test
    it 'ensures email presence' do
      user = User.new(password: "sample",
                      user_type: "normal", 
                      active: true, 
                      comment: "simple").save
      expect(user).to eq(false)
    end

    #5. make sure you have a failling test
    #6. make your test to pass
    #7. repeat this process until you cover all the cases (validations in this case)


    it 'ensures email uniqueness' do
      User.create!(email: "sample@example.com",
                   password: "sample")
      user = User.new(email: "sample@example.com",
                      password: "sample")
      expect(user).to_not be_valid
      expect(user.errors.messages[:email][0]).to include("ya ha sido utilizado")
    end
  end
end
