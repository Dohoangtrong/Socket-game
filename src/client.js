$(function () {
  var socket = io();
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');

  socket.on('gameStateUpdate', updateGameState);

  function updateGameState(gameState) {
    players = gameState.players
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var playerCount = Object.keys(players).length
    document.getElementById('playerCount').innerHTML = String(playerCount) + " knight" + (playerCount > 1 ? 's' : '') + " on the battle"
  }

  function drawPlayers(players) {
    Object.keys(players).forEach((playerId) => {
      let player = players[playerId]
    })
  }

  $('html').keydown(function(e) {
    switch(e.key){
      case "w":
      case "W":
      case "ArrowUp":{
        socket.emit('up', players);
        break;
      }
      case "s":
      case "S":
      case "ArrowDown":{
        socket.emit('down', players);
        break;
      }
      case "a":
      case "A":
      case "ArrowLeft":{
        socket.emit('left', players);
        break;
      }
      case "d":
      case "D":
      case "ArrowRight": {
        socket.emit('right', players);
        break;
      }
      case " ":
      case "Spacebar":{
        socket.emit('flash', players);
        break;
      }
      case "j":
      case "J":{
        socket.emit('fire', players);
        break;
      }
    }

  })

  function gameLoop() {
    updateGameState({players: players})
    Object.keys(players).forEach((playerId) => {
      let player = players[playerId]
      movePlayer(playerId)
    })
  }

  function drawGame() {
    drawPlayers(players)
    requestAnimationFrame(drawGame)
  }

  setInterval(gameLoop, 25)
  requestAnimationFrame(drawGame)
});

