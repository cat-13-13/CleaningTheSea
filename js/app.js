const game = {
    name: '-- Game',
    description: '',
    version: '1.0.0',
    license: undefined,
    author: 'Catalina Fernández y Jaime Lloreda',

    ctx: undefined,

    canvasTag: undefined,
    canvasSize: { w: undefined, h: undefined },

    FPS: 60,
    framesIndex: 0,

    player: undefined,
    bullets: [],

    enemies: [],
    killedEnemies: 0,

    targetPos: [],
    nPositionsUp: 4,
    nPositionsDown: 6,
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

        this.targetPos = [
            {
                posID: 1,
                x: (this.canvasSize.w / this.nPositionsUp),
                y: this.lineUpPos,
                occupied: false
            },
            {
                posID: 2,
                x: ((this.canvasSize.w / this.nPositionsUp) * 3),
                y: this.lineUpPos,
                occupied: false
            },
            {
                posID: 3,
                x: this.canvasSize.w / this.nPositionsDown,
                y: this.lineDownPos,
                occupied: false
            },
            {
                posID: 4,
                x: (this.canvasSize.w / this.nPositionsDown) * 3,
                y: this.lineDownPos,
                occupied: false
            },
            {
                posID: 5,
                x: (this.canvasSize.w / this.nPositionsDown) * 5,
                y: this.lineDownPos,
                occupied: false
            }
        ]

    },

    start() {
        setInterval(() => {
            this.clearAll()

            this.framesIndex % 100 === 0 && this.createEnemy()
            this.framesIndex++

            this.drawAll()

            this.collision()

        }, 1000 / this.FPS);
    },

    stop() {
        clearInterval(2)
    },

    collision() {
        this.enemies.forEach(enemy => {
            this.player.bullets.forEach(bullet => {
                if (bullet.bulletPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
                    bullet.bulletPos.y < enemy.enemyPos.y + enemy.enemySize.h &&
                    bullet.bulletPos.x + bullet.radius > enemy.enemyPos.x &&
                    bullet.bulletPos.y + bullet.radius > enemy.enemyPos.y) {
                    this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
                    const deadEnemy = this.enemies.splice(this.enemies.indexOf(enemy), 1)
                    this.killedEnemies += 1
                    if (this.killedEnemies === 5) {
                        this.bullets = []
                    }
                    deadEnemy[0].boardPos.occupied = false
                }

            })
        })

        // this.friends.forEach(friend => {
        //     this.player.bullets.forEach(bullet => {
        //         if (bullet.bulletPos.x < friend.friendPos.x + friend.friendSize.w &&
        //             bullet.bulletPos.y < friend.friendPos.y + friend.friendSize.h &&
        //             bullet.bulletPos.x + bullet.radius > friend.friendPos.x &&
        //             bullet.bulletPos.y + bullet.radius > friend.friendPos.y) {
        //             this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1)
        //             const deadFriend = this.friends.splice(this.friends.indexOf(friend), 1)
        //             this.killedFriends += 1
        // if (this.killedEnemies === 5) {
        //     this.bullets = []
        // }
        //             deadFriend[0].boardPos.occupied = false
        //         }

        //     })
        // })
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasTag, this.canvasSize, this.keys, this.FPS, this.killedEnemies, this.bullets)
    },

    createEnemy() {
        const filtered = this.targetPos.filter(elm => !elm.occupied)

        if (filtered.length) {
            const randomNum = Math.floor(Math.random() * filtered.length)
            const randomPos = filtered[randomNum]

            randomPos.occupied = true

            this.enemies.length < 5 && this.enemies.push(new Enemy(this.ctx, this.canvasSize, randomPos))
        }

    },

    drawAll() {
        this.enemies.forEach(enemy => {
            enemy.draw()
        });
        this.player.draw()
        this.drawLines()

    },

    drawLines() {
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