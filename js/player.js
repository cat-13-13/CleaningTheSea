class Player {
    constructor(ctx, canvasTag, canvasSize, FPS, killedEnemys) {
        this.ctx = ctx
        this.canvasTag = canvasTag
        this.canvasSize = canvasSize
        this.FPS = FPS
        this.killedEnemys = killedEnemys

        this.image = new Image()
        this.image.src = './img/diving-goggles.png'

        this.playerSize = {
            w: 170,
            h: 170
        }

        this.playerPos = {
            x: (this.canvasSize.w - this.playerSize.w) / 2,
            y: this.canvasSize.h - this.playerSize.h - 100
        }

        this.mousePos = {
            x: undefined,
            y: undefined
        }

        this.mouseIsDown = false

        this.bullets = []
        this.bulletsCount = 10

        this.setListeners()

        this.slingshotStretchAudio = new Audio('./sounds/slingshot_stretch.mp3')
        this.slingshotShootAudio = new Audio('./sounds/slingshot_shoot.mp3')
    }


    draw() {
        this.ctx.drawImage(this.image, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)

        this.bullets.forEach(bullet => bullet.draw())

        this.mouseIsDown && this.drawLines()
    }

    drawLines() {
        this.ctx.beginPath()
        this.ctx.strokeStyle = '#f2e95f'
        this.ctx.lineWidth = 7
        this.ctx.moveTo(this.playerPos.x, this.playerPos.y + (this.playerSize.h) / 2)
        this.ctx.lineTo(this.mousePos.x, this.mousePos.y)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = '#f2e95f'
        this.ctx.lineWidth = 7
        this.ctx.moveTo(this.playerPos.x + this.playerSize.w, this.playerPos.y + (this.playerSize.h) / 2)
        this.ctx.lineTo(this.mousePos.x, this.mousePos.y)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    shoot() {
        this.bulletsCount--
    }

    setListeners() {

        this.canvasTag.onmousedown = (event => {

            this.mouseIsDown = true

            const { offsetX, offsetY } = event
            this.mousePos.x = offsetX
            this.mousePos.y = offsetY

            this.bulletsCount > 0 && this.bullets.push(new Bullets(this.ctx, this.canvasSize, this.playerPos, this.playerSize, this.FPS, this.mousePos.x, this.mousePos.y))
        })

        this.canvasTag.onmousemove = (event => {

            if (this.mouseIsDown) {
                this.slingshotStretchAudio.play()

                const { offsetX, offsetY } = event

                const shootedBullet = this.bullets[this.bullets.length - 1]
                shootedBullet.bulletPos.x = offsetX
                shootedBullet.bulletPos.y = offsetY

                this.mousePos.x = offsetX
                this.mousePos.y = offsetY

                shootedBullet.bulletsSpeed.x = (shootedBullet.initBulletPos.x - shootedBullet.bulletPos.x) / this.FPS * 4
                shootedBullet.bulletsSpeed.y = (shootedBullet.initBulletPos.y - shootedBullet.bulletPos.y) / this.FPS * 4
            }
        })

        this.canvasTag.onmouseup = (event => {

            if (this.bulletsCount > 0) {
                this.slingshotShootAudio.play()
                this.shoot()
            }

            this.mouseIsDown = false

            this.bullets[this.bullets.length - 1].moving = true
        })
    }
}