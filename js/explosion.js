class Explosion {
    constructor(ctx, canvasSize, explosionPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.explosionPos = {
            x: explosionPos.x,
            y: explosionPos.y
        }

        this.explosionSize = {
            w: 100,
            h: 100
        }

        this.image = new Image()
        this.image.src = './img/explosion.png'
        this.image.frames = 5
        this.image.framesIndex = 0


    }

    draw(framesIndex) {
        // this.ctx.drawImage(this.image, this.explosionPos.x, this.explosionPos.y, this.explosionSize.w, this.explosionSize.h)
        this.ctx.drawImage(this.image, this.image.width / this.image.frames * this.image.framesIndex, 0, this.image.width / this.image.frames, this.image.height, this.explosionPos.x, this.explosionPos.y, this.explosionSize.w, this.explosionSize.h)

        this.animate(framesIndex)

    }

    animate(framesIndex) {

        if (framesIndex % 12 == 0) {
            this.image.framesIndex++;
        }

        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0
        }

    }
}