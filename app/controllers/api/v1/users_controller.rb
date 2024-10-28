# User Constroller
class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate
  before_action :set_user, only: %i[show update update_password destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/check_email
  def check_email
    @user = User.find_by(email: params[:email])
    render json: @user, status: :ok
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1/update_password
  def update_password
    if @user.update(password: params[:password])
      render json: { success: "Password updated successfully" }, status: :ok
    else
      render json: {
               error: user.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private

  def set_user
    @user = User.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.expect(user: %i[first_name last_name email phone role password])
  end
end
