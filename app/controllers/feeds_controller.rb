class FeedsController < ApplicationController
  def create
  end

  def new
    @current_user = current_user

    render :new
  end

  def show

  end

  def destroy
  end

end
