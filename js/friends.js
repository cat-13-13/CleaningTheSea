class Friend {
    constructor(ctx, canvasSize, randomPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.boardPos = randomPos
        this.friendFrames = 0

        this.image = new Image();
        this.image.src = undefined

        this.friendSize = {
            w: 70,
            h: 70
        }

        this.friendPos = {
            x: this.boardPos.x - (this.friendSize.w / 2),
            y: this.boardPos.y - this.friendSize.h
        }

    }

    randomImage() {
        const images = [
            './img/creature.png',
            './img/fish.png',
            './img/jellyfish.png',
            './img/stingray.png',
            './img/whale.png',
        ]

        const randomNum = Math.floor(Math.random() * images.length)
        this.image.src = images[randomNum]
    }

    draw() {
        this.ctx.drawImage(this.image, this.friendPos.x, this.friendPos.y, this.friendSize.w, this.friendSize.h)
        // this.ctx.fillStyle = 'yellow'
        // this.ctx.fillRect(this.friendPos.x, this.friendPos.y, this.friendSize.w, this.friendSize.h)
        this.friendFrames++
    }
}