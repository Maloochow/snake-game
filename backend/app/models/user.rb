class User < ApplicationRecord
    has_many :games, :dependent => :destroy
    validates :name, presence: true, uniqueness: true

    def scores
        self.games.map{|g| g.score}.sort{|a, b| b <=> a}
    end
end
