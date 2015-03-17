class PostsController < ApplicationController
  before_filter :require_logged_in

  def index
    render json: Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @author = User.find(params[:author_id])
    #@post.author_id = current_user.id

    if @post.save
      render :create
    else
      flash.now[:errors] = @post.errors.full_messages
      render json: {error: "invalid"}, status: :unprocessable_entity
    end

  end

  def show
    @post = Post.includes(:comments).find(params[:id])
    if @post.nil?
      render json: {error: "No User Found"}, status: :unprocessable_entity
    else
      render :show
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update_attributes(post_params)
      render json: @post
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end

  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: @post
  end

  private
  def post_params
    params.require(:post).permit(:author_id, :body, :receiver_id)
  end

end
