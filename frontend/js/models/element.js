class Element {    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
    }

    render() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2)
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    delete() {
        ctx.clearRect(this.x -1 , this.y -1, this.width + 2, this.height + 2)
    }
}