class Bullets {
    constructor(ctx, canvasSize, playerPos, playerSize, FPS, mousePosX, mousePosY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.FPS = FPS

        this.image = new Image()
        this.image.src = './img/soap-bubbles.png'

        this.bulletSize = {
            w: 40,
            h: 40
        }

        this.radius = 20

        this.initBulletPos = {
            x: this.playerPos.x + playerSize.w / 2,
            y: this.playerPos.y
        }

        this.bulletPos = {
            x: mousePosX,
            y: mousePosY
        }

        this.mousePos = {
            x: mousePosX,
            y: mousePosY
        }

        this.bulletsSpeed = {
            x: (this.initBulletPos.x - this.bulletPos.x) / this.FPS * 4,
            y: (this.initBulletPos.y - this.bulletPos.y) / this.FPS * 4
        }

        this.moving = false
    }

    draw() {
        this.ctx.drawImage(this.image, this.bulletPos.x - this.bulletSize.w / 2, this.bulletPos.y - this.bulletSize.h / 2, this.bulletSize.w, this.bulletSize.h)
        this.moving && this.move()
    }

    move() {
        this.bulletPos.x += this.bulletsSpeed.x
        this.bulletPos.y += this.bulletsSpeed.y

        if (this.bulletPos.y < 0) {
            this.bulletsSpeed.y *= -1
        }

        if (this.bulletPos.x >= this.canvasSize.w - this.radius || this.bulletPos.x <= 0) {
            this.bulletsSpeed.x *= -1
        }
    }
}