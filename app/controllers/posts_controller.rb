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
    @post.author_id = current_user.id

    if @post.save
      render json: @post
    else
      flash.now[:errors] = @post.errors.full_messages
      render json: {error: "invalid"}, status: :unprocessable_entity
    end

  end

  def show
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
    redirect_to user_url(current_user)
  end

  private
  def post_params
    params.require(:post).permit(:body)
  end

end
