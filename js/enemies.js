class Enemy {
    constructor(ctx, canvasSize, randomPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.boardPos = randomPos

        this.enemySize = {
            w: 70,
            h: 70
        }

        this.enemyPos = {
            x: this.boardPos.x - (this.enemySize.w / 2),
            y: this.boardPos.y - this.enemySize.h
        }
    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }
}