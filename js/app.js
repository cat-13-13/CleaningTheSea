const game = {
    name: '-- Game',
    descrption: '',
    version: '1.0.0',
    license: undefined,
    author: 'Catalina Fernández y Jaime Lloreda',
    canvasTag: undefined,
    ctx: undefined,
    FPS: 60,
    framesIndex: 0,
    canvasSize: { w: undefined, h: undefined },
    player: undefined,
    bullets: [],
    enemys: [],
    lineUpPos: undefined,
    lineDownPos: undefined,
    boardPosition: undefined,
    friends: [],
    keys: {},

    init() {
        this.setContext()
        this.setDimension()
        this.createPlayer()
        this.start()

    },

    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
    },

    setDimension() {
        this.canvasSize = {
            w: window.innerWidth - 400,
            h: window.innerHeight - 100
        }

        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)

        this.lineUpPos = this.canvasSize.h / 4
        this.lineDownPos = this.canvasSize.h / 2 + 40
    },

    start() {
        setInterval(() => {
            this.clearAll()

            this.framesIndex % 100 === 0 && this.createEnemys()
            this.framesIndex++

            this.drawAll()

            this.enemys.forEach(enemy => {
                this.player.bullets.forEach(bullet => {
                    if (bullet.bulletPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
                        bullet.bulletPos.y < enemy.enemyPos.y + enemy.enemySize.h &&
                        bullet.bulletPos.x + bullet.radius > enemy.enemyPos.x &&
                        bullet.bulletPos.y + bullet.radius > enemy.enemyPos.y) {
                        this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
                        this.enemys.splice(this.enemys.indexOf(enemy), 1)
                    }

                })
            })

        }, 1000 / this.FPS);
    },

    stop() {
        clearInterval(2)
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasTag, this.canvasSize, this.keys, this.FPS)
    },

    createEnemys() {
        this.boardPosition = Math.floor(Math.random() * 5)

        this.enemys.length < 5 && this.enemys.push(new Enemy(this.ctx, this.canvasSize, this.lineUpPos, this.lineDownPos, this.boardPosition))
    },

    drawAll() {
        this.enemys.forEach(enemy => {
            enemy.draw()
        });
        this.player.draw()

        this.ctx.beginPath()
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 5
        this.ctx.moveTo(0, this.lineUpPos)
        this.ctx.lineTo(this.canvasSize.w, this.lineUpPos)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 5
        this.ctx.moveTo(0, this.lineDownPos)
        this.ctx.lineTo(this.canvasSize.w, this.lineDownPos)
        this.ctx.stroke()
        this.ctx.closePath()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createBullet() {
        this.bullets.push()
    }
}