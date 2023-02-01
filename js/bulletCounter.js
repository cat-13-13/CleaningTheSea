class BulletCounter {
    constructor(ctx, canvasSize, BulletCounter) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.BulletCounter = BulletCounter

        this.imageSize = {
            w: 20,
            h: 20
        }

        this.image = new Image()
        this.image.src = './img/soap-bubbles.png'
    }

    draw(i) {

        this.ctx.drawImage(this.image, this.imageSize.w * 2 * i, this.canvasSize.h - 80, this.imageSize.w, this.imageSize.h)

    }
}