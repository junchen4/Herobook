class PostsController < ApplicationController
  before_filter :require_logged_in

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.author_id = current_user.id

    if @post.save
        redirect_to user_url(current_user)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
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
      redirect_to user_url(@post.author_id)
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
