class CommentsController < ApplicationController
  before_filter :require_logged_in

  def index
    render json: Comment.all
  end

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    #@comment.author_id = current_user.id

    if @comment.save
      render json: @comment
    else
      flash.now[:errors] = @comment.errors.full_messages
      render json: {error: "invalid"}, status: :unprocessable_entity
    end

  end

  def show
  end

  def edit
    @comment = Comment.find(params[:id])
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update_attributes(comment_params)
      render json: @comment
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :edit
    end

  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: @comment
  end

  private
  def comment_params
    params.require(:comment).permit(:author_id, :body, :post_id)
  end
end
