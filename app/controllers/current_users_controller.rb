class CurrentUsersController < ApplicationController
  before_filter :require_logged_in

  def new
    @user = User.new
  end

  def create
  end

  def show
    @current_user = User.find(params[:id])
    @all_friends = current_user.all_friends
    if @current_user.nil?
      render json: {error: "No User Found"}, status: :unprocessable_entity
    else
      render :show
    end
  end

end
