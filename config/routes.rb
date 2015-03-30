FinalProject::Application.routes.draw do
  resources :users do
    get "search", on: :collection
  end
  resources :posts
  resources :comments
  resources :likes, only: [:new, :create, :show, :destroy]
  resource :session, only: [:new, :create, :show, :destroy]
  resources :requests

  root to: "roots#root"
end
