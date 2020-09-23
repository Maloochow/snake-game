class Game {
    static all = []

    constructor() {
        this.score = 0;
        this.user = user().name
        Game.all.push(this)
        Snake.all = []
    }

    static start() {
        let game = new Game
        game.setStartScreen()
    }

    set playerLoggedIn(status) {
        return this.playerLoggedIn = status
    }

    get playerLoggedIn() {
        return this.playerLoggedIn
    }

    setStartScreen() {
        this.setBackground()
        let cardContent = `Use the arrow keys on your keyboard to control the snake (orange)`
        this.createCard("Welcome to Snake", cardContent, "Start Game")
        usernameDiv().innerText = `Current Player: ${this.user}`
        userbestDiv().innerText = `Best: ${user().games[0]}`
        this.startGame()  
    }

    setBackground() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    }

    startGame() {
        let startGameButton = document.querySelector("div.card-action > a")
        startGameButton.addEventListener("click", function(e) {
            let cardContainer = document.querySelector("div.card-container")
            removeAllChildNodes(cardContainer)
            ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            setupControls();
        })
    }

    over(score) {
        this.score = score
        patchNewScore(user().name, score)
        this.setOverScreen()
    }
    
    setOverScreen() {
        this.setBackground();
        let cardContent = `Length: ${this.score}`
        this.createCard("Game Over", cardContent, "Play Again")
        new Game
        this.startGame()
    }

    createCard(title, content, button, link) {
        let cardContainer = document.querySelector("div.card-container")
        
        let cardDiv = document.createElement("div")
        cardDiv.className = "card"
        cardContainer.appendChild(cardDiv)

        let cardContentDiv = document.createElement("div")
        cardContentDiv.className = "card-content"
        cardDiv.appendChild(cardContentDiv)

        let cardTitle = document.createElement("span")
        cardTitle.className = "card-title"
        cardTitle.innerText = title
        cardContentDiv.appendChild(cardTitle)
        
        let cardContent = document.createElement("p")
        cardContent.innerText = content
        cardContentDiv.appendChild(cardContent)

        let cardActionDiv = document.createElement("div")
        cardActionDiv.className = "card-action"
        cardDiv.appendChild(cardActionDiv)

        let cardText = document.createElement('a')
        cardText.innerText = button
        if (link) {
            cardText.href = link
        }
        cardActionDiv.appendChild(cardText)
    }

    static get last() {
        let i = Game.all.length
        return Game.all[i-1]
    }
}