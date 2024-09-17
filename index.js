import express from 'express';
import { Server } from 'http';
import dotenv from "dotenv";
import socketIO from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import setupSocket from "./src/socket.js" 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const app = express();
const http = new Server(app);
const io = socketIO(http);

app.use(express.static('src'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

setupSocket(io)

http.listen(process.env.PORT || 8080, function(){
    const port = process.env.PORT || '8080'
    console.log('listening on *:', port);
});

