class Player {
    constructor(ctx, canvasTag, canvasSize, keys, FPS, killedEnemys, bullets) {
        this.ctx = ctx
        this.canvasTag = canvasTag
        this.canvasSize = canvasSize
        this.keys = keys
        this.FPS = FPS
        this.killedEnemys = killedEnemys
        this.bullets = bullets

        this.mousePos = {
            x: undefined,
            y: undefined
        }

        this.playerSize = {
            w: 100,
            h: 100
        }

        this.playerPos = {
            x: (this.canvasSize.w - this.playerSize.w) / 2,
            y: this.canvasSize.h - this.playerSize.h
        }

        this.bulletsCount = 10

        this.setListeners()

    }


    draw() {
        this.ctx.fillStyle = '#41C08B'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

        this.bullets.forEach(bullet => bullet.draw())
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.canvasSize, this.playerPos, this.playerSize, this.FPS, this.mousePos.x, this.mousePos.y))
        this.bulletsCount--
    }

    setListeners() {

        this.canvasTag.onclick = (event => {

            const { offsetX, offsetY } = event

            this.mousePos.x = offsetX
            this.mousePos.y = offsetY

            if (this.bulletsCount > 0) {
                this.shoot()
            }

        })

    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.bulletPos.y <= 0 && bullet.bulletPos.x >= this.canvasSize.w)
    }



}