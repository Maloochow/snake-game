const animate = window.requestAnimationFrame

const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;
const SPACEBAR = 32;
const UPKEY = 38;
const DOWNKEY = 40;
const LEFTKEY = 37;
const RIGHTKEY = 39;
const posx = () => ((Math.random() * 31).toFixed())*25;
const posy = () => ((Math.random() * 23).toFixed())*25;

let canvas, ctx, bean, request;
const snake = () => Snake.first
const user = () => User.last
const game = () => Game.last
const usernameDiv = () => document.getElementById("user-name")
const userbestDiv = () => document.getElementById("user-best")
const currentUserDiv = () => document.getElementById("current-user")
const bestScoreDiv = () => document.getElementById("best-score-ranking")

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    User.setSignInTable()
    new User
    user().name = "Anonymous"
    user().id = 2
    Game.start()
});

function newBean() {
    let beanx = parseInt(posx(), 10);
    let beany = parseInt(posy(), 10);
    if ((!Snake.all.map( e => e.x).includes(beanx)) && (!Snake.all.map(e=>e.y).includes(beany))) {
        bean = new Bean(beanx, beany)
    } else {
        newBean();
    }
}

function setupControls() {
    animate(draw);
    Snake.create(parseInt(posx(), 10), parseInt(posy(), 10));
    newBean();
    setupDirection();
}

function newSnakeBody() {
    let newX, newY
    switch (Snake.last.direction) {
        case "up":
            newX = Snake.last.x;
            newY = Snake.last.y + 26;
            break;
        case "down":
            newX = Snake.last.x;
            newY = Snake.last.y - 26;
            break;
        case "left":
            newX = Snake.last.x + 26;
            newY = Snake.last.y;
            break;
        case "right":
            newX = Snake.last.x - 26;
            newY = Snake.last.y;
            break;
    }
    return Snake.create(newX, newY)
}

function setupDirection() {
    document.addEventListener('keydown', function (e) {
        if (e.which == UPKEY && snake().direction != "down") {
            setMove("up");
        } else if (e.which == DOWNKEY && snake().direction != "up") {
            setMove("down");
        } else if (e.which == LEFTKEY && snake().direction != "right") {
            setMove("left");
        } else if (e.which == RIGHTKEY && snake().direction != "left") {
            setMove("right");
        }
    })
  }

function setMove(direction) {
    setPauseTime()
    snake().direction = direction
}

function setPauseTime() {
    if (Snake.all.length <= 10) {
        Snake.pauseTime = 250
    } else if (Snake.all.length <= 25) {
        Snake.pauseTime = 200
    } else if (Snake.all.length <= 35) {
        Snake.pauseTime = 150
    } else if (Snake.all.length <= 50) {
        Snake.pauseTime = 100
    } else if (Snake.all.length > 50) {
        Snake.pauseTime = 750
    }
}

function draw() {
    update();
    render();
    if (isAlive()) {
        animate(draw)
    } else {
        game().over(Snake.all.length);
    }
}

function update() {
        Snake.update()
        if (snake().x === bean.x && snake().y === bean.y) {
            bean.delete()
            delete bean
            for (let i = 1; i < 5; i++) newSnakeBody();
            newBean()
        }
}

function render() {
    Snake.render();
    bean.render()
}

function isNotSuicidal() {
    if (Snake.all.filter(e=> e.x === snake().x && e.y === snake().y).length === 2) {
        return false
    } else {
        return true
    }
}

function isInZone() {
    if (snake().x >= 0 && snake().x + 25 <= GAME_WIDTH && snake().y >= 0 && snake().y + 25 <= GAME_HEIGHT) {
        return true
    } else {
        return false
    }
}

function isAlive() {
    if (isNotSuicidal() && isInZone()) {
        return true
    } else {
        return false
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}