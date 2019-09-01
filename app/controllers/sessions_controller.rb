class SessionsController < ApplicationController
  include CurrentUserConcern
  
  def logged_in
    if @current_user
      render json: {
        user: @current_user
      } 
    else
      render json: {
      }
    end
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {
        user: user
      }
      # redirect_to root_url, notice: 'Log in!'
      # flash.now[:alert] = 'USUARIO LOGEADO'
      # redirect_to root_url
    else
      render json: {
      }
      # flash.now[:alert] = 'Email o password incorrecto'
      # render 'new'
    end
  end

  def log_out
    session[:user_id] = nil
    render json: {}
    # redirect_to root_url, notice: 'Log out!:'
  end

end
