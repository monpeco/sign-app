Rails.application.routes.draw do
  root to: 'store#home'
  get 'store/home'
  get 'store/about'
  get 'store/contact'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
