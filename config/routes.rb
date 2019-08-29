Rails.application.routes.draw do
  
  ## resources :products
  ## resources :categories
  root to: 'store#home'
  get '*path', to: 'store#home'
  ## resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :registration, only: [:create]
  ## get 'sessions', to: 'sessions#new'
  ## get 'store/home'
  ## get 'store/about'
  ## get 'store/contact'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
