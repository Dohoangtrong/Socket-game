import dotenv from "dotenv";
import bullet from "./bullet.js"

dotenv.config();

var players = {}
var gameSize = process.env.GAME_SIZE
var playerSize = process.env.PLAYER_SIZE
var distance_fls = process.env.FLS_DIS

function fireAction(playerId){

}

function flashAction(playerId){

}

function isValidPosition(newPosition, playerId) {
    if (newPosition.x < 0 || newPosition.x + playerSize > gameSize) {
      return false
    }
    if (newPosition.y < 0 || newPosition.y + playerSize > gameSize) {
      return false
    }
    var hasCollided = false
  
  
    Object.keys(players).forEach((key) => {
      if (key == playerId) { return } 
      player = players[key]

      if (checkCollision(player, newPosition)) {
        hasCollided = true
      }
    })
    if (hasCollided) {
      return false
    }
    return true
}

function checkCollision(obj1, obj2) {
    return(Math.abs(obj1.x - obj2.x) <= playerSize && Math.abs(obj1.y - obj2.y) <= playerSize)
}

function movePlayer(id) {
    var player = players[id]
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
    fireAction: fireAction
};