class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[show update destroy]

  # GET /posts
  def index
    @posts = Rails.cache.fetch("all_posts", expires_in: 12.hours) do
      Post.all.to_a
    end
    render json: @posts
  end

  # GET /posts/1
  def show
    @post = Rails.cache.fetch("post_#{params[:id]}", expires_in: 12.hours) do
    Post.find(params[:id])
    end
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      Rails.cache.delete("all_posts")
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      Rails.cache.delete("all_posts")
      Rails.cache.delete("post_#{params[:id]}")
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
    Rails.cache.delete("all_posts")
    Rails.cache.delete("post_#{params[:id]}")
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.expect(post: %i[title description])
  end
end
