class FeedsController < ApplicationController
  def create
  end

  def new
    @current_user = current_user

    if !@current_user.nil?
      render :new
    else 
      render json: {error: "No user found"}, status: :unprocessable_entity  
    end 
  end

  def show

  end

  def destroy
  end

end
