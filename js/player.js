class Player {
    constructor(ctx, canvasTag, canvasSize, keys, FPS, killedEnemys) {
        this.ctx = ctx
        this.canvasTag = canvasTag
        this.canvasSize = canvasSize
        this.keys = keys
        this.FPS = FPS
        this.killedEnemys = killedEnemys
        this.bullets = []

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
            y: this.canvasSize.h - this.playerSize.h - 100
        }

        this.bulletsCount = 10

        this.mouseIsDown = false

        this.setListeners()

    }


    draw() {
        this.ctx.fillStyle = '#41C08B'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

        this.bullets.forEach(bullet => bullet.draw())
    }

    shoot() {
        // this.bullets.push(new Bullets(this.ctx, this.canvasSize, this.playerPos, this.playerSize, this.FPS, this.mousePos.x, this.mousePos.y))
        this.bulletsCount--
    }

    setListeners() {

        // this.canvasTag.onclick = (event => {

        //     const { offsetX, offsetY } = event

        //     this.mousePos.x = offsetX
        //     this.mousePos.y = offsetY

        //     if (this.bulletsCount > 0) {
        //         this.shoot()
        //     }

        // })

        this.canvasTag.onmousedown = (event => {

            this.mouseIsDown = true

            const { offsetX, offsetY } = event

            this.mousePos.x = offsetX
            this.mousePos.y = offsetY
            this.bullets.push(new Bullets(this.ctx, this.canvasSize, this.playerPos, this.playerSize, this.FPS, this.mousePos.x, this.mousePos.y))

        })

        this.canvasTag.onmousemove = (event => {

            if (this.mouseIsDown) {
                const { offsetX, offsetY } = event
                const shootedBullet = this.bullets[this.bullets.length - 1]
                shootedBullet.bulletPos.x = offsetX
                shootedBullet.bulletPos.y = offsetY

                shootedBullet.bulletsSpeed.x = (shootedBullet.initBulletPos.x - shootedBullet.bulletPos.x) / this.FPS * 4
                shootedBullet.bulletsSpeed.y = (shootedBullet.initBulletPos.y - shootedBullet.bulletPos.y) / this.FPS * 4
            }
        })

        this.canvasTag.onmouseup = (event => {

            this.mouseIsDown = false

            this.bullets[this.bullets.length - 1].moving = true

            if (this.bulletsCount > 0) {
                this.shoot()
            }
        })

    }

}