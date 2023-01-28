class Enemy {
    constructor(ctx, canvasSize, lineUpPos, lineDownPos, boardPosition) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.lineUpPos = lineUpPos
        this.lineDownPos = lineDownPos

        this.enemySize = {
            w: 70,
            h: 70
        }

        this.nPositionsUp = 4
        this.nPositionsDown = 6
        this.boardPosition = [
            {
                x: (this.canvasSize.w / this.nPositionsUp) - (this.enemySize.w / 2),
                y: this.lineUpPos - this.enemySize.h
            },
            {
                x: ((this.canvasSize.w / this.nPositionsUp) * 3) - (this.enemySize.w / 2),
                y: this.lineUpPos - this.enemySize.h
            },
            {
                x: this.canvasSize.w / this.nPositionsDown - (this.enemySize.w / 2),
                y: this.lineDownPos - this.enemySize.h
            },
            {
                x: (this.canvasSize.w / this.nPositionsDown) - (this.enemySize.w / 2),
                y: this.lineDownPos - this.enemySize.h
            },
            {
                x: this.canvasSize.w / this.nPositionsDown * 3 - (this.enemySize.w / 2),
                y: this.lineDownPos - this.enemySize.h
            }
        ]

        this.enemyPos = this.boardPosition[boardPosition]


    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }
}