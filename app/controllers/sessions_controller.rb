class SessionsController < ApplicationController
  include CurrentUserConcern
  
  def new
    if @current_user
      render json: {
        user: @current_user
      }
    end
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
      # redirect_to root_url, notice: 'Log in!'
      # flash.now[:alert] = 'USUARIO LOGEADO'
      # redirect_to root_url
    else
      render json: {
        status: 401
      }
      # flash.now[:alert] = 'Email o password incorrecto'
      # render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { status: 200 }
    
    # redirect_to root_url, notice: 'Log out!:'
  end
end
