require 'rails_helper'
 
RSpec.describe 'Creating a user', type: :feature do
  
  scenario 'valid inputs' do
    visit new_user_path
    fill_in 'user_email', with: 'sample@example.com'
    fill_in 'user_password', with: 'sample'
    fill_in 'user_password_confirmation', with: 'sample'
    click_on 'Crear Usuario'
    visit users_path
    expect(page).to have_content('sample@example.com')
  end

  scenario 'invalid inputs - email missing' do
    visit new_user_path
    fill_in 'user_email', with: ''
    fill_in 'user_password', with: 'sample'
    fill_in 'user_password_confirmation', with: 'sample'
    click_on 'Crear Usuario'
    expect(page).to have_content('Este campo no puede estar vacio')
  end

end
