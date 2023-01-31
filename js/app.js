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

    background: undefined,

    player: undefined,

    enemies: [],
    killedEnemies: 0,

    targetPos: [],
    nPositionsUp: 4,
    nPositionsDown: 6,
    lineUpPos: undefined,
    lineDownPos: undefined,
    boardPosition: undefined,

    friends: [],
    friendsLives: 3,

    keys: {},

    level: 0,

    init() {
        this.setContext()
        this.setDimension()
        this.setPositions()
        this.creatBackground()
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

    },

    setPositions() {
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

            document.querySelector('.bulletsCounter').innerHTML = this.player.bulletsCount

            this.framesIndex++
            this.framesIndex % 100 === 0 && this.createEnemy()
            if (this.framesIndex % 250 === 0 && this.level > 1) {
                this.createFriend()
            }


            this.drawAll()
            this.collision()

            this.friendsLives === 0 && this.stop()
            if (this.player.bullets.length === 0 && this.player.bulletsCount === 0) {
                this.stop()
            }

            if (this.killedEnemies % 5 === 0 && this.killedEnemies != 0) {
                this.createLevelUp()
                this.level++
            }
        }, 1000 / this.FPS);
    },

    stop() {
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.canvasSize.w / 2, this.canvasSize.h / 2)
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
                    document.querySelector('.deathsCounter').innerHTML = this.killedEnemies

                    if (this.killedEnemies % 5 === 0) {
                        this.player.bulletsCount = 10
                    }
                    deadEnemy[0].boardPos.occupied = false
                    this.player.bulletsCount === 0 && this.stop()

                }

            })
        })

        this.friends.forEach((friend, i) => {
            this.player.bullets.forEach((bullet, i) => {
                if (bullet.bulletPos.x < friend.friendPos.x + friend.friendSize.w &&
                    bullet.bulletPos.y < friend.friendPos.y + friend.friendSize.h &&
                    bullet.bulletPos.x + bullet.radius > friend.friendPos.x &&
                    bullet.bulletPos.y + bullet.radius > friend.friendPos.y) {
                    this.player.bullets.splice(i)
                    const deadFriend = this.friends.splice(i, 1)
                    deadFriend[0].boardPos.occupied = false
                    this.friendsLives--
                    document.querySelector('.deadFriends').innerHTML = this.friendsLives
                }

            })
        })
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasTag, this.canvasSize, this.keys, this.FPS, this.killedEnemies)
    },

    creatBackground() {
        this.background = new Background(this.ctx, this.canvasSize)
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

    createFriend() {
        const filtered = this.targetPos.filter(elm => !elm.occupied)

        if (filtered.length) {
            const randomNum = Math.floor(Math.random() * filtered.length)
            const randomPos = filtered[randomNum]

            randomPos.occupied = true

            this.enemies.length < 5 && this.friends.push(new Friend(this.ctx, this.canvasSize, randomPos))
            this.friends[this.friends.length - 1].randomImage()
        }
    },

    createBullet() {
        this.player.bullets.push()
    },

    createLevelUp() {
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "blue";
        this.ctx.textAlign = "center";
        this.ctx.fillText("LEVEL UP!", this.canvasSize.w / 2, this.canvasSize.h / 2)
    },

    moveTargets() {
        this.friends.forEach(friend => {
            if (friend.friendPos.y < friend)
                friend.friendSpeed.y++
        })
        this.friends.forEach(friend => friend.draw())
    },

    drawAll() {
        this.background.draw()
        this.enemies.forEach(enemy => enemy.draw())
        this.friends.forEach(friend => friend.draw())

        this.player.draw()
        // this.drawLines()
        this.deleteBullets()
        this.clearFriend()
    },

    // drawLines() {
    //     this.ctx.beginPath()
    //     this.ctx.strokeStyle = 'white'
    //     this.ctx.lineWidth = 5
    //     this.ctx.moveTo(0, this.lineUpPos)
    //     this.ctx.lineTo(this.canvasSize.w, this.lineUpPos)
    //     this.ctx.stroke()
    //     this.ctx.closePath()

    //     this.ctx.beginPath()
    //     this.ctx.strokeStyle = 'white'
    //     this.ctx.lineWidth = 5
    //     this.ctx.moveTo(0, this.lineDownPos)
    //     this.ctx.lineTo(this.canvasSize.w, this.lineDownPos)
    //     this.ctx.stroke()
    //     this.ctx.closePath()
    // },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    clearFriend() {
        this.friends.forEach((friend, i) => {
            if (friend.friendFrames % 400 === 0) {
                const clearedFriend = this.friends.splice(i, 1)
                clearedFriend[0].boardPos.occupied = false
            }

        })
    },

    deleteBullets() {
        this.player.bullets.forEach((bullet, i) => {
            (bullet.bulletPos.y + bullet.radius > this.canvasSize.h) && this.player.bullets.splice(i, 1)
        })
    },
}