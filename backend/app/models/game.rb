class Game < ApplicationRecord
  belongs_to :user

  def self.ranking
    ranking = []
    Game.all.each do |game|
      hash = {}
      hash["user"] = game.user.name
      hash["score"] = game.score
      ranking.push(hash)
    end
    ranking.sort{|a, b| b["score"] <=> a["score"]}
  end
end
