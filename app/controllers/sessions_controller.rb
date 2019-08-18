class SessionsController < ApplicationController
  def new
    @is_log_in = true
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      # redirect_to root_url, notice: 'Log in!'
      flash.now[:alert] = 'USUARIO LOGEADO'
      redirect_to root_url
    else
      flash.now[:alert] = 'Email o password incorrecto'
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: 'Log out!:'
  end
end
