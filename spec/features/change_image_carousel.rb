require 'rails_helper'
 
RSpec.describe 'test carousel', type: :feature do
  
  scenario 'check css classes', :js => true do
    visit "/"
    expect(page).to have_css('.carousel-item')
    expect(page).to have_css('.active')
  end

end
