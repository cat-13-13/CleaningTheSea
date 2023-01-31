class Enemy {
    constructor(ctx, canvasSize, randomPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.boardPos = randomPos

        this.image = new Image()
        this.image.src = undefined

        this.enemySize = {
            w: 90,
            h: 110
        }

        this.enemyPos = {
            x: this.boardPos.x - (this.enemySize.w / 2),
            y: this.boardPos.y - this.enemySize.h
        }
    }

    randomImage() {
        const images = [
            './img/bag.png',
            './img/bottle.png',
            './img/cigarette.png',
            './img/coke.png',
        ]

        const randomNum = Math.floor(Math.random() * images.length)
        this.image.src = images[randomNum]
    }

    draw() {
        this.ctx.drawImage(this.image, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }
}