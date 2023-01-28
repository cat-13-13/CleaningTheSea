class Friend {
    constructor(ctx, canvasSize, lineUpPos, lineDownPos, boardPosition) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.lineUpPos = lineUpPos
        this.lineDownPos = lineDownPos

        this.friendSize = {
            w: 60,
            h: 60
        }

        this.nPositionsUp = 6
        this.nPositionsDown = 4
        this.boardPosition = [
            {
                x: (this.canvasSize.w / this.nPositionsUp) - this.enemySize.w,
                y: this.lineUpPos - this.enemySize.h
            },
            {
                x: ((this.canvasSize.w / this.nPositionsUp) * 3) - this.enemySize.w / 2,
                y: this.lineUpPos - this.enemySize.h
            },
            {
                x: ((this.canvasSize.w / this.nPositionsUp) * 5) - this.enemySize.w / 2,
                y: this.lineUpPos - this.enemySize.h
            },
            {
                x: this.canvasSize.w / this.nPositionsDown - this.enemySize.w,
                y: this.lineDownPos - this.enemySize.h
            },
            {
                x: this.canvasSize.w / this.nPositionsDown * 3 - this.enemySize.w,
                y: this.lineDownPos - this.enemySize.h
            }
        ]
        this.friendPos = this.boardPosition[boardPosition]


    }

    draw() {
        this.ctx.fillStyle = 'yellow'
        this.ctx.fillRect(this.friendPos.x, this.friendPos.y, this.friendSize.w, this.friendSize.h)
    }
}