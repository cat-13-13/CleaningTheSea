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
    enemys: [],
    friends: [],
    paintballs: [],
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
    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            
        }, 1000 / this.FPS);
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize, this.keys)
    },

    drawPlayer() {
        this.player.draw()
    },

    drawAll(){
        this.drawPlayer()


        this.ctx.beginPath()
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 5
        this.ctx.moveTo(0, this.canvasSize.h / 4)
        this.ctx.lineTo(this.canvasSize.w, this.canvasSize.h / 4)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 5
        this.ctx.moveTo(0, this.canvasSize.h / 2 + 40)
        this.ctx.lineTo(this.canvasSize.w, this.canvasSize.h / 2 + 40)
        this.ctx.stroke()
        this.ctx.closePath()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }
}