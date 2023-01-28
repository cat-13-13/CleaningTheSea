class Player {
    constructor(ctx, canvasTag, canvasSize, keys, FPS) {
        this.ctx = ctx
        this.canvasTag = canvasTag
        this.canvasSize = canvasSize
        this.keys = keys
        this.FPS = FPS

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

        this.bullets = []
        this.bulletsCount = 0

        this.setListeners()

    }


    draw() {
        this.ctx.fillStyle = '#41C08B'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

        this.bullets.forEach(bullet => bullet.draw())
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.canvasSize, this.playerPos, this.playerSize, this.FPS, this.mousePos.x, this.mousePos.y))
        this.bulletsCount++
        console.log(this.bulletsCount);

    }

    setListeners() {

        this.canvasTag.onclick = (event => {

            this.mousePos.x = event.offsetX
            this.mousePos.y = event.offsetY

            if (this.bulletsCount < 10) {
                this.shoot()
            }

        })

    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.bulletPos.y <= 0 && bullet.bulletPos.x >= this.canvasSize.w)
    }



}