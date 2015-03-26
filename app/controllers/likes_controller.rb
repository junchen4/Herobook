class LikesController < ApplicationController
  def new
    @like = Like.new
  end

  def create
    @like = Like.new(like_params)
    if @like.save
      render json: @like
    else
      flash.now[:errors] = @like.errors.full_messages
      render json: {error: "invalid"}, status: :unprocessable_entity
    end
  end

  def show
  end

  def destroy
  end

  private
  def like_params
    params.require(:like).permit(:author_id, :likeable_id, :likeable_type)
  end

end
