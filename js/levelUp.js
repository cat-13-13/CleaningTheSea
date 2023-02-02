class LevelUp {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image();
        this.image.src = './img/Level-up.png'

        this.levelUpSize = {
            w: 400,
            h: 400
        }

        this.levelUpPos = {
            x: this.canvasSize.w / 2 - this.levelUpSize.w / 2,
            y: this.canvasSize.h / 8
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.levelUpPos.x, this.levelUpPos.y, this.levelUpSize.w, this.levelUpSize.h)
    }
}