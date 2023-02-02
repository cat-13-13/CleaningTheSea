class GameOver {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image();
        this.image.src = './img/game-over.png'

        this.gameOverPos = {
            x: 0,
            y: 0
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.gameOverPos.x, this.gameOverPos.y, this.canvasSize.w, this.canvasSize.h)
    }
}