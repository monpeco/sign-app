require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  context 'users controller' do
     
    it 'index returns successfully a json response' do
      get :index
      expect(response.header['Content-Type']).to include 'application/json'
    end

    it 'show renders successfully' do
      user = User.create(email: "sample333@example.com", password: "sample")
      get :show, params: { id: user }
      expect(response).to render_template(:show)
    end

    it 'new renders successfully' do
      get :new
      expect(response).to render_template(:new)
    end

  end
end
