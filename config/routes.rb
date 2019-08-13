Rails.application.routes.draw do
  resources :categories
  root to: 'store#home'
  
  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  get 'sessions', to: 'sessions#new'
  get 'store/home'
  get 'store/about'
  get 'store/contact'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
