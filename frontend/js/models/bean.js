class Bean extends Element {
    static all = []

    constructor (x, y) {
        super(x, y);
        this.color = "green";
        Bean.all.push(this)
    }
}