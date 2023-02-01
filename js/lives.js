class Lives {
    constructor(ctx, canvasSize, friendsLives) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.friendsLives = friendsLives

        this.imageSize = {
            w: 50,
            h: 50
        }

        this.image = new Image()
        this.image.src = './img/clown-fish.png'
    }

    draw(i) {

        this.ctx.drawImage(this.image, this.canvasSize.w - this.imageSize.w * 2 * i, this.canvasSize.h - this.imageSize.h * 2, this.imageSize.w, this.imageSize.h)

    }
}