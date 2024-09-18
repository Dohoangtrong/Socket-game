import bullet from "./bullet.js"

var players = {}
var gameSize = process.env.GAME_SIZE
var playerSize = process.env.PLAYER_SIZE
var distance_fls = process.env.FLS_DIS

function fireAction(playerId){

}

function flashAction(playerId){

}

function isValidPosition(newPosition, playerId) {

  return true
}

function checkCollision(obj1, obj2) {
}

function accelPlayer(id, direction) {
  var player = players[id]
  player.accel.x = 0;
  player.accel.y = 0;

  switch(direction){
    case "right":{
      player.accel.x = process.env.ACCELERATION_RATE
      break;
    }
    case "left":{
      player.accel.x = -process.env.ACCELERATION_RATE
      break;
    }
    case "down":{
      player.accel.y = process.env.ACCELERATION_RATE
      break;
    }
    case "up":{
      player.accel.y = -process.env.ACCELERATION_RATE
      break;
    }
  }
  movePlayer();
}

function movePlayer(id){
  var player = players[id]
  player.veloc.x += player.accel.x;
  player.veloc.y += player.accel.y;

  // max speed
  const speed = Math.sqrt(player.veloc.x ** 2 + player.veloc.y ** 2);
  if (speed > process.env.MAX_SPEED) {
    player.veloc.x = (player.veloc.x / speed) * player.maxSpeed;
    player.veloc.y = (player.veloc.y / speed) * player.maxSpeed;
  }

  if (speed > 0) {
    player.angle = Math.atan2(player.veloc.x, player.veloc.y);
  }

  var newPosition = {
    x: player.x + player.veloc.x,
    y: player.y + player.veloc.y
  }
  // add friction -> velocity
  player.veloc.x *= process.env.FRICTION;
  player.veloc.y *= process.env.FRICTION;

  if ( isValidPosition(newPosition,id) ){
    player.x= newPosition.x;
    player.y = newPosition.y
  }else{
    // reset accel
    player.accel.x = 0;
    player.accel.y = 0;
  }

}


//https://github.com/PentoHQ/tech-challenge-frontend/blob/b6cae6ccbaeeefb1cd6483d73a1d5c0a57beafa3/src/util/stringToColour.ts#L4
function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export default {
  players: players,
  stringToColour: stringToColour,
  movePlayer: movePlayer,
  flashAction: flashAction,
  fireAction: fireAction,
  movePlayer: movePlayer,
  accelPlayer: accelPlayer
};