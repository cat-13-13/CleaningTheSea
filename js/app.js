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
    backgroundTrack: new Audio('./sounds/Under-the-sea.mp3'),
    bubblesAudio: new Audio('./sounds/bubbles.mp3'),

    gameOverAudio: new Audio('./sounds/Game-over.mp3'),
    collisionEnemyAudio: new Audio('./sounds/enemy-bubbles.mp3'),
    collisionFriendAudio: new Audio('./sounds/Scream.mp3'),
    levelUpAudio: new Audio('./sounds/Level-up.mp3'),
    levelUpFrameCounter: 0,

    levelUpImage: undefined,
    gameOverImage: undefined,

    player: undefined,

    enemies: [],
    killedEnemies: 0, //POINTS

    targetPos: [],
    nPositionsUp: 4,
    nPositionsDown: 6,
    lineUpPos: undefined,
    lineDownPos: undefined,
    boardPosition: undefined,

    friends: [],
    friendsLives: 3,
    live: undefined,

    bulletCounter: undefined,

    explosion: [],
    explosionPos: {
        x: undefined,
        y: undefined
    },

    keys: {},

    level: 0,

    init() {
        this.setContext()
        this.setDimension()
        this.setPositions()
        this.creatBackground()
        this.createPlayer()
        this.createLives()
        this.createBulletCounter()
        this.createLevelUp()
        this.createGameOver()

        this.start()
        this.bubblesAudio.play()
        this.bubblesAudio.onended = () => {
            this.backgroundTrack.play()
        }
    },

    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
    },

    setDimension() {
        this.canvasSize = {
            w: window.innerWidth - 400,
            h: window.innerHeight
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
        this.backgroundTrack.play()
        setInterval(() => {
            this.clearAll()

            document.querySelector('.level').innerHTML = this.level

            this.framesIndex++
            this.framesIndex % 200 === 0 && this.createEnemy()
            if (this.framesIndex % 250 === 0 && this.level >= 1) {
                this.createFriend()
            }

            if (this.level > 1) {
                this.enemies.forEach(enemy => {
                    enemy.enemySpeed.x = this.level - 1
                    enemy.move()
                })
            }

            if (this.level > 2) {
                this.friends.forEach(friend => {
                    friend.friendSpeed.x = this.level - 1
                    friend.move()
                })
            }

            this.drawAll()
            this.collision()

            this.friendsLives === 0 && this.stop()
            if (this.player.bullets.length === 0 && this.player.bulletsCount === 0) {
                this.stop()
            }

            if (this.killedEnemies % 5 === 0 && this.killedEnemies != 0) {
                this.drawLevelUp()
                this.level = Math.floor(this.killedEnemies / 5)
                this.levelUpFrameCounter++
            } else this.levelUpFrameCounter = 0

        }, 1000 / this.FPS);
    },

    stop() {
        this.gameOverImage.draw()
        this.backgroundTrack.pause()
        this.gameOverAudio.play()
        // setTimeout(() => {
        //     alert("Ups! Do you wanna try again?")
        //     window.location.reload()
        // }, 1000);
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

                    this.explosionPos.x = deadEnemy[0].enemyPos.x
                    this.explosionPos.y = deadEnemy[0].enemyPos.y
                    this.createExplosion()
                    setTimeout(() => {
                        this.explosion.shift()
                    }, 1000);

                    this.collisionEnemyAudio.play()

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

                    this.explosionPos.x = friend.friendPos.x
                    this.explosionPos.y = friend.friendPos.y

                    this.createExplosion()
                    setTimeout(() => {
                        this.explosion.shift()
                    }, 1000);

                    this.collisionFriendAudio.play()

                    const deadFriend = this.friends.splice(i, 1)
                    deadFriend[0].boardPos.occupied = false
                    this.friendsLives--

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
            this.enemies[this.enemies.length - 1].randomImage()
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
        this.levelUpImage = new LevelUp(this.ctx, this.canvasSize)
        this.levelUpAudio.play()
    },

    createGameOver() {
        this.gameOverImage = new GameOver(this.ctx, this.canvasSize)

    },

    createLives() {
        this.live = new Lives(this.ctx, this.canvasSize, this.friendsLives)
    },

    createBulletCounter() {
        this.bulletCounter = new BulletCounter(this.ctx, this.canvasSize, this.player.bulletCounter)
    },

    createExplosion() {
        this.explosion.push(new Explosion(this.ctx, this.canvasSize, this.explosionPos))
    },

    drawAll() {
        this.background.draw()
        this.enemies.forEach(enemy => enemy.draw())
        this.friends.forEach(friend => friend.draw())

        this.player.draw()
        this.deleteBullets()
        this.clearFriend()

        for (let i = 1; i <= this.friendsLives; i++) {
            this.live.draw(i)
        }

        for (let i = this.player.bulletsCount; i > 0; i--) {
            this.bulletCounter.draw(i)
        }

        this.explosion.forEach(elm => elm.draw(this.framesIndex))

    },

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

    drawLevelUp() {
        if (this.levelUpFrameCounter < 100) {
            this.levelUpImage.draw()
        }
    },

    drawGameOver() {
        this.gameOverImage.draw()
    }
}