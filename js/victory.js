class Victory {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image();
        this.image.src = './img/victory.png'

        this.victoryPos = {
            x: 0,
            y: 0
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.victoryPos.x, this.victoryPos.y, this.canvasSize.w, this.canvasSize.h)
    }
}