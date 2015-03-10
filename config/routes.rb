FinalProject::Application.routes.draw do
  resources :users, only: [:new, :create, :show, :edit, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]
end
