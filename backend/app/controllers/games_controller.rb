class GamesController < ApplicationController
    def index
        games = Game.ranking
        render json: games
    end

end
