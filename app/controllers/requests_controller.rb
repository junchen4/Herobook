class RequestsController < ApplicationController
  before_filter :require_logged_in

  def new
    @request = Request.new
  end

  def create
    @request = Request.new(request_params)

    if @request.save
      render :create
    else
      #flash.now[:errors] = @user.errors.full_messages
      render json: {error: "Request Can't be saved"}, status: :unprocessable_entity
    end
  end

  def show

  end

  def update
    @request = Request.find(params[:id])
    @request.status = "accepted"
    @request.save!
    render json: @request
  end

  def destroy
    @request = Request.find(params[:id])
    @request.destroy!
    render json: {}
  end

  private
  def request_params
    params.require(:request).permit(:requestor_id, :requestee_id, :status)
  end

end
