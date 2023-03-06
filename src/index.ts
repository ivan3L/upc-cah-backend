import app from "./app";
import http from "http";
import { Server } from "socket.io";
import {roomModel} from './models/rooms'
import { PlayerInRoomModel } from "./interfaces/PlayerInRoom";
const server = http.createServer(app);
const port = 8080;


const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

server.listen(port, () => {
    console.log(`Server started on port 8080`);
  });
let rooms: roomModel[] = [];
const playersInRoom: PlayerInRoomModel  = {};

io.on("connection", function (socket) {
  console.log("Nuevo cliente conectado");
  socket.on('crear-room', (data) => {
    console.log("data",data)
      rooms.push({ roomName: `room-${data.roomName}`, players: [socket.id], namePlayer:[data.name] });
      socket.join(data.id);
      if (!playersInRoom[data.id])
      {
        playersInRoom[data.id] = [];
      }
      playersInRoom[data.id].push({ id: socket.id, name: data.name, user:data.user })
      console.log("playersInRoom[data.id]", playersInRoom[data.id])
      io.to(data.id).emit("playersInRoom", playersInRoom[data.id] )
      console.log(`Se ha creado el room con id: ${data.id} y el usuario : ${data.name}`);
  });
  socket.on('join-room', (data) => {
    if (data) {
    socket.join(data.id);
    playersInRoom[data.id].push({ id: socket.id, name: data.name, user: data.user })
    console.log("playersInRoom[data.id]", playersInRoom[data.id])
    io.to(data.id).emit("playersInRoom", playersInRoom[data.id] )
    console.log(`Se ha unido al room con id: ${data.id} el usuario : ${data.name}`);
  } else {
    console.log("Error al emitir el evento")
  }

  });
  socket.on("disconnect", () => {
    console.log(`usuario desconectado`)
  });
});



