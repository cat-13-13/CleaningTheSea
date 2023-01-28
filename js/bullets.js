class Bullets {
    constructor(ctx, canvasSize, playerPos, playerSize, FPS, mousePosX, mousePosY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.FPS = FPS

        this.mousePos = {
            x: mousePosX,
            y: mousePosY
        }

        this.bulletPos = {
            x: this.playerPos.x + playerSize.w / 2,
            y: this.playerPos.y
        }

        this.radius = 10

        this.bulletsSpeed = {
            x: (this.mousePos.x - this.bulletPos.x) / this.FPS,
            y: (this.mousePos.y - this.bulletPos.y) / this.FPS
        }

        this.gravity = 0
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#33c4fa'
        this.ctx.arc(this.bulletPos.x, this.bulletPos.y, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
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