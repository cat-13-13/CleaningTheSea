class Friend {
    constructor(ctx, canvasSize, randomPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.boardPos = randomPos

        this.friendSize = {
            w: 70,
            h: 70
        }

        this.friendPos = {
            x: this.boardPos.x - (this.friendSize.w / 2),
            y: this.boardPos.y - this.friendSize.h
        }

    }

    draw() {
        this.ctx.fillStyle = 'yellow'
        this.ctx.fillRect(this.friendPos.x, this.friendPos.y, this.friendSize.w, this.friendSize.h)
    }
}