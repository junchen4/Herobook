class SessionsController < ApplicationController
  before_filter :require_logged_in, :except => [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

    if @user.nil?
      flash.now[:errors] = ["Account with login details not found. Try again please"]
      render :new
    else
      login(@user)
      redirect_to "#/users/#{@user.id}"
    end
  end

  def show
    @current_user = current_user
    @all_friends = current_user.all_friends
    render :show
  end

  def destroy
    logout
    redirect_to new_session_url
  end

end
