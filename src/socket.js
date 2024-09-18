import engine from './game.js'
import knight from './knight.js';

var gameInterval, updateInterval
var ioGlobal

function gameLoop() {
    Object.keys(engine.players).forEach((playerId) => {
      let player = engine.players[playerId]
    })
}

function emitUpdates() {
    ioGlobal.emit('gameStateUpdate', { players: engine.players });
}

function setupSocket(io) {
    ioGlobal = io
    io.on('connection', (socket) => {
        console.log('User connected: ', socket.id);

        if (Object.keys(engine.players).length == 0) {
            gameInterval = setInterval(gameLoop, 25)
            updateInterval = setInterval(emitUpdates, 40)
        }

        var posX = 20
        var posY = 20
        // while (!engine.isValidPosition({ x: posX, y: posY }, socket.id)) {
        //     posX = Math.floor(Math.random() * Number(engine.gameSize) - 100) + 20
        //     posY = Math.floor(Math.random() * Number(engine.gameSize) - 100) + 20
        // }

        engine.players[socket.id] = {
            name: knight.knightName(),
            x: posX,
            y: posY,
            veloc:{
                x: 0,
                y: 0
            },
            accel:{
                x: 0,
                y: 0
            },
            colour: engine.stringToColour(socket.id),
            score: 0,
            angle: 0,
        };

        socket.on('disconnect', () => {
            delete engine.players[socket.id];
            if (Object.keys(engine.players).length > 0) {
                io.emit('gameStateUpdate', engine.players);
            } else {
                clearInterval(gameInterval);
                clearInterval(updateInterval);
            }
        });

        socket.on('up', function(msg){
            
        });
    
        socket.on('down', function(msg) {
        })
    
        socket.on('left', function(msg){
        });
    
        socket.on('right', function(msg) {
        })

        socket.on('fire', function(msg){
        })

        socket.on("flash", function(msg){
        })

    });
}

export default setupSocket;
