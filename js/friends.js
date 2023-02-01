class Friend {
    constructor(ctx, canvasSize, randomPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.boardPos = randomPos
        this.friendFrames = 0

        this.image = new Image()
        this.image.src = undefined

        this.friendSize = {
            w: 140,
            h: 100
        }


        this.friendPos = {
            x: this.boardPos.x - (this.friendSize.w / 2),
            y: this.boardPos.y - this.friendSize.h
        }

        // this.friendOriginalPos = {
        //     x: this.friendPos.x,
        //     y: this.friendPos.y
        // }

        this.friendSpeed = {
            x: undefined,
            y: 1000 / 5
        }

    }

    randomImage() {
        const images = [
            './img/star.png',
            './img/fish.png',
            './img/jellyfish.png',
            './img/turtle.png',
            './img/crab.png'
        ]

        const randomNum = Math.floor(Math.random() * images.length)
        this.image.src = images[randomNum]
    }

    draw() {
        this.ctx.drawImage(this.image, this.friendPos.x, this.friendPos.y, this.friendSize.w, this.friendSize.h)
        this.friendFrames++
        // this.move()
    }

    // move() {
    //     // this.friendPos.x += this.friendSpeed.x
    //     this.friendPos.y += this.friendSpeed.y

    //     // if (this.friendPos.x < this.friendOriginalPos.x + 10) {
    //     //     this.friendSpeed.x *= -1
    //     // }
    //     if (this.friendPos.y < this.friendOriginalPos.y + 10 || this.friendPos.y > this.friendOriginalPos.y - 10) {
    //         this.friendSpeed.y *= -1
    //     }
    // }
}