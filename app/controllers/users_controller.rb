class UsersController < ApplicationController
  before_filter :require_logged_in, :except => [:new, :create]

  def index
    render json: User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      redirect_to "#/users/#{@user.id}"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:authored_posts, :received_posts, :incoming_requests, :outgoing_requests).find(params[:id])
    @all_friends = @user.all_friends
    if @user.nil?
      render json: {error: "No User Found"}, status: :unprocessable_entity
    else
      render :show
    end
  end

  def update

  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
