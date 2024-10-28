Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  # post "/auth/login", to: "sessions#create"
  # get "/auth/authorized", to: "sessions#show"

  namespace :api do
    namespace :v1 do
      post "/auth/login", to: "sessions#create"
      get "/auth/verify", to: "sessions#show"
      resources :users do
        patch "update_password", on: :member
        get "check_email", on: :collection
        # get "requests", to: "client_requests#index", on: :member
      end

      resources :moving_services do
        post "bulk_update", on: :collection
      end

      resources :posts
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  get "*path",
      to: "fallback#index",
      constraints: ->(request) { !request.xhr? && request.format.html? }
end
