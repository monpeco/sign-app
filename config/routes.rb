Rails.application.routes.draw do
  ## resources :products
  ## resources :categories
  root to: 'store#home'
  ## resources :users
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  get :logged_in , to: 'sessions#logged_in'
  delete :log_out , to: 'sessions#log_out'
  ## get 'sessions', to: 'sessions#new'
  ## get 'store/home'
  ## get 'store/about'
  ## get 'store/contact'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
