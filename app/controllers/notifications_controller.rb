require 'byebug'

class NotificationsController < ApplicationController
before_filter :require_logged_in

  def index
  	@notifications = Notification.where(user_id: current_user.id)
    render :index
  end

  def save_notifications 
    user_posts_id = current_user.posts.map {|post| post.id}
    user_comments_id = current_user.comments.map {|comment| comment.id}

    @post_notifications = Post.where(["author_id != ? and receiver_id = ?", current_user.id, current_user.id])
    @acceptance_notifications = Request.where(["requestor_id = ? and status = ?", current_user.id, "accepted"])
    
    @comment_notifications = Comment.where(["author_id != ? and post_id in (?)", current_user.id, user_posts_id])
    @post_like_notifications = Like.where(["author_id != ? and likeable_type = ? and likeable_id in (?)", current_user.id, "Post", user_posts_id])
    
    @comment_like_notifications = Like.where(["author_id != ? and likeable_type = ? and likeable_id in (?) ", current_user.id, "Comment", user_comments_id])

    @post_notifications.each do |post|
      params = {class_name: "Post", author_id: post.author_id, receiver_id: post.receiver_id, post_id: post.id}
      notification = Notification.where(params)
      if notification.length == 0
      	notification = Notification.new(params)
        notification.user_id = current_user.id
      	if !notification.save
      		render json: {error: "invalid"}, status: :unprocessable_entity
      	end
      end
    end 

    @acceptance_notifications.each do |acceptance|
      params = {class_name: "Request", author_id: acceptance.requestor_id, receiver_id: acceptance.requestee_id}
      notification = Notification.where(params)
      if notification.length == 0
      	notification = Notification.new(params)
        notification.user_id = current_user.id
      	if !notification.save
      		render json: {error: "invalid"}, status: :unprocessable_entity
      	end
      end
    end   

    @comment_notifications.each do |comment|
      params = {class_name: "Comment", author_id: comment.author_id, receiver_id: comment.id, post_id: comment.post_id} #receiver_id here refers to the comment id
      notification = Notification.where(params)
      if notification.length == 0
      	notification = Notification.new(params)
        notification.user_id = current_user.id
      	if !notification.save
      		render json: {error: "invalid"}, status: :unprocessable_entity
      	end
      end
    end   

    @post_like_notifications.each do |like|
      params = {class_name: "Post Like", author_id: like.author_id, post_id: like.likeable_id}
      notification = Notification.where(params)
      if notification.length == 0
      	notification = Notification.new(params)
        notification.user_id = current_user.id
      	if !notification.save
      		render json: {error: "invalid"}, status: :unprocessable_entity
      	end
      end
    end  

    @comment_like_notifications.each do |like|
      post_id = like.likeable.post_id
      params = {class_name: "Comment Like", author_id: like.author_id, receiver_id: like.likeable_id, post_id: post_id} #receiver_id here represents the comment's id
      notification = Notification.where(params)
      if notification.length == 0
      	notification = Notification.new(params)
        notification.user_id = current_user.id
      	if !notification.save
      		render json: {error: "invalid"}, status: :unprocessable_entity
      	end
      end
    end      
    
    @all = @post_notifications.concat(@acceptance_notifications).concat(@comment_notifications).concat(@post_like_notifications).concat(@comment_like_notifications)
    render json: @all
  end

  def new
  end

  def create
  end

  def show
  end

  def update
    @notification = Notification.find(params[:id])

    if @notification.update_attributes(notification_params)
      render json: @notification
    else
      flash.now[:errors] = @notification.errors.full_messages
      render json: {error: "Errors saving"}, status: :unprocessable_entity
    end

  end

  def destroy
    @notification = Notification.find(params[:id])
    @notification.destroy
    render json: @notification
  end

  private
  def notification_params
    params.require(:notification).permit(:class_name, :author_id, :receiver_id, :post_id, :viewed)
  end

end
