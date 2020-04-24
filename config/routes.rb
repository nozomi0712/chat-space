Rails.application.routes.draw do
<<<<<<< Updated upstream
  root to: "messages#index"
=======
  devise_for :users
  root to: "groups#index"
  resources :users, only: [:edit, :update, :destroy]
  resources :groups, only: [:index, :new, :create, :edit, :update]
>>>>>>> Stashed changes
end
