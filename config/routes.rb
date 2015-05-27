FinalProject::Application.routes.draw do
  resources :users do
    get "search", on: :collection
    get "current", on: :collection
  end

  resources :posts
  resources :comments
  resources :likes, only: [:new, :create, :show, :destroy]
  resource :session, only: [:new, :create, :show, :destroy]
  resources :requests
  resources :feeds, only: [:new, :create, :show, :destroy]
  resources :notifications do
    get "save_notifications", on: :collection
  end

  root to: "roots#root"
end
