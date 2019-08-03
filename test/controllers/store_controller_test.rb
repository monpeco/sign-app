require 'test_helper'

class StoreControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get store_home_url
    assert_response :success
  end

  test "should get about" do
    get store_about_url
    assert_response :success
  end

  test "should get contact" do
    get store_contact_url
    assert_response :success
  end

end
