class Background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image();
        this.image.src = './img/ocean-background.jpg'

        this.backgroundPos = {
            x: 0,
            y: 0
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.backgroundPos.x, this.backgroundPos.y, this.canvasSize.w, this.canvasSize.h)
    }
}