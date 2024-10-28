class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate, only: %i[create]

  def create
    @user = User.find_by_email(params[:email])
    authenticated_user = @user&.authenticate(params[:password])

    if authenticated_user
      @token = JsonWebToken.encode({ user_id: @user.id })

      render json: { user: @user, token: @token }, status: :ok
    else
      render json: {
               error: "Invalid email or password."
             },
             status: :unauthorized
    end
  end

  def show
    if current_user
      render json: { user: current_user }, status: :ok
    else
      render json: { error: "user not logged in." }, status: :unauthorized
    end
  end
end
