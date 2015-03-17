FinalProject::Application.routes.draw do
  resources :users
  resources :posts
  resources :comments

  resource :session, only: [:new, :create, :show, :destroy]
  resources :requests

  root to: "roots#root"
end
