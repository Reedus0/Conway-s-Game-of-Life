export class Cell {
    public x: number = 0
    public y: number = 0
    private active: boolean = false

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    setActive(active: boolean) {
        this.active = active
    }

    getActive() {
        return this.active
    }
}