FinalProject::Application.routes.draw do
  resources :users
  resources :posts

  resource :session, only: [:new, :create, :destroy]
  resources :requests

  root to: "roots#root"
end
