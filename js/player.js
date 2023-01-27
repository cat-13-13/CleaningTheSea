class Player {
    constructor(ctx, canvasSize, keys) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.keys = keys

        this.playerSize = {
            w: 100,
            h: 100
        }

        this.playerPos = {
            x: (this.canvasSize.w - this.playerSize.w) / 2,
            y: this.canvasSize.h - this.playerSize.h
        }

    }

    draw() {
        this.ctx.fillStyle = '#41C08B'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }
}