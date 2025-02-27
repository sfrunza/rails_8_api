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
      end

      resources :requests do
        post "pair", on: :member
        get "status_counts", on: :collection
        get "requests_by_date", on: :collection
        get "dates_with_requests", on: :collection
        resources :messages, only: %i[index create]
      end

      resources :requests_messages, only: %i[index]

      resources :search, only: %i[index]

      resources :notifications, only: %i[index]

      resources :services do
        post "bulk_update", on: :collection
      end

      resources :extra_services do
        post "bulk_update", on: :collection
      end

      resources :rates do
        post "bulk_update", on: :collection
      end

      resources :trucks do
        post "bulk_update", on: :collection
      end

      resources :packings do
        post "bulk_update", on: :collection
      end

      resources :calendar_rates, only: %i[index create update]
      get "/calendar_rates/:date", to: "calendar_rates#show", as: "show"
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  get "*path",
      to: "fallback#index",
      constraints: ->(request) { !request.xhr? && request.format.html? }
end
