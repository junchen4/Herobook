class RequestsController < ApplicationController
  before_filter :require_logged_in

  def new
    @request = Request.new
  end

  def create
    @request = Request.new
    @request.requestor_id = current_user.id
    @request.requestee_id = params[:request][:requestee_id]
    @request.status = "pending"

    if @request.save
      render json: @request
    else
      flash.now[:errors] = @user.errors.full_messages
      redirect_to user_url(current_user)
    end
  end

  def show

  end

  def update
    @request = Request.find(params[:id])
    @request.status = "accepted"
    @request.save!
    redirect_to user_url(current_user)
  end

  def destroy
    @request = Request.find(params[:id])
    @request.destroy!
    redirect_to user_url(current_user)
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
