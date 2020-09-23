class UsersController < ApplicationController    
    before_action :find_user, except: [:create, :destroy]

    def show
        render json: user_hash
    end

    def create
        @user = User.find_or_create_by(name: params[:name])
        render json: user_hash
    end

    def update
        @user.games.build(:score => params[:score])
        @user.save
        render json: user_hash
    end

    def destroy
        user1 = User.find_by_id(params[:id])
        @user = user1.destroy
        render json: user_hash
    end
    
    private
    def find_user
        @user = User.find_by(name: params[:name])
        if !@user
            render json: {message: "No user found with the name"} and return
        end
    end

    def user_hash
        {id: @user.id, name: @user.name, games: @user.scores}
    end
end
