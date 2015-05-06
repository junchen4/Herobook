class UsersController < ApplicationController
  before_filter :require_logged_in, :except => [:new, :create]

  def index
    @Users = User.all
    render :index
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
      flash[:errors] = @user.errors.full_messages
      redirect_to new_session_url
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
    @user = User.find(params[:id])
    
    if @user.update_attributes(user_params)
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
      render json: {error: "Errors saving"}, status: :unprocessable_entity
    end
  end

  def search
    if params[:query].present? || params[:firstName].present? || params[:lastName].present?
      if params[:isFullName] == "true"
        @users = User.where("first_name ~ :firstName or last_name ~ :lastName or first_name ~ :firstNameCap or last_name ~ :lastNameCap ",{firstName: params[:firstName],
          lastName: params[:lastName], firstNameCap: params[:firstName].capitalize, lastNameCap: params[:lastName].capitalize})
      else
        @users = User.where("first_name ~ :query or last_name ~ :query or first_name ~ :queryCap or last_name ~ :queryCap", {query: params[:query], queryCap: params[:query].capitalize})
      end
    else
      @users = User.none
    end

    render :search

  end

  def current
    @current_user = current_user

    render :current_user
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :hometown, :current_city, :employer, :education, :relationship_status, :sex, :about_me, :profile_photo, :cover_photo)
  end

end
