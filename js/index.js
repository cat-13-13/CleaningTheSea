document.querySelector('.start-btn').onclick = event => {
    game.level = 0
    game.enemies = []
    game.friends = []
    game.killedEnemies = 0
    game.friendsLives = 3
    game.framesIndex = 0
    game.backgroundTrack.currentTime = 0
    game.bubblesAudio.currentTime = 0
    game.init()
}