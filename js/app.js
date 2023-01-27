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
    enemys: [],
    friends: [],
    paintballs: [],
    // keys: {}

    init() {
        this.setContext()
        this.setDimension()
        console.log(this.canvasSize.w)
        
    },

    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
    },

    setDimension() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }
}