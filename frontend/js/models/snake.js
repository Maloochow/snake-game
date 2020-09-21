class Snake extends Element {
    static all = []
    static pauseTime = null
    static active = true

    constructor(x, y) {
        super(x, y)
        this.color = "orange"
        this.direction = null;
    }

    static create(x, y) {
        let newSnake = new Snake(x, y)
        Snake.all.push(newSnake)
    }

    static update() {
        let snakeHead = Snake.first
        if (Snake.pauseTime && Snake.active) {
            switch (snakeHead.direction) {
                case "up":
                    this.createMove(snakeHead.x, snakeHead.y - 25, snakeHead.direction)
                    break;
                case "down":
                    this.createMove(snakeHead.x, snakeHead.y +25, snakeHead.direction)
                    break;
                case "left":
                    this.createMove(snakeHead.x - 25, snakeHead.y, snakeHead.direction)
                    break;
                case "right":
                    this.createMove(snakeHead.x + 25, snakeHead.y, snakeHead.direction)
                    break;
            }
        }

    }

    static createMove(x, y, direction) {
        Snake.all.unshift(new Snake(x, y));
        let newHead = Snake.first
        newHead.direction = direction
        let lastSnake = Snake.last
        lastSnake.delete()
        Snake.all.pop()
        Snake.active = false;
        setTimeout( e => Snake.active = true , Snake.pauseTime)
    }

    static render() {
        for (const snake of Snake.all) {
            snake.render()
        }
    }

    static get first() {
        return Snake.all[0]
    }

    static get last() {
        let i = Snake.all.length
        return Snake.all[i-1]
    }
}