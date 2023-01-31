class Bullets {
    constructor(ctx, canvasSize, playerPos, playerSize, FPS, mousePosX, mousePosY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.FPS = FPS

        this.bulletSize = {
            w: 40,
            h: 40
        }

        this.mousePos = {
            x: mousePosX,
            y: mousePosY
        }

        this.initBulletPos = {
            x: this.playerPos.x + playerSize.w / 2,
            y: this.playerPos.y
        }

        this.bulletPos = {
            x: mousePosX,
            y: mousePosY
        }

        this.image = new Image()
        this.image.src = './img/soap-bubbles.png'

        this.radius = 20

        this.bulletsSpeed = {
            x: (this.initBulletPos.x - this.bulletPos.x) / this.FPS * 4,
            y: (this.initBulletPos.y - this.bulletPos.y) / this.FPS * 4
            // x: (this.bulletPos.x - this.mousePos.x) / this.FPS * 4,
            // y: (this.bulletPos.y - this.mousePos.y) / this.FPS * 4
        }

        this.gravity = 0
        this.moving = false
    }

    draw() {
        this.ctx.drawImage(this.image, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
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

        this.bulletsSpeed.y += this.gravity
    }

}