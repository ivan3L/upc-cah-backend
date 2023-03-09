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
      rooms.push({ roomName: `room-${data.roomName}`, players: [socket.id], namePlayer:[data.name] });
      socket.join(data.idRoom);
      if (!playersInRoom[data.idRoom])
      {
        playersInRoom[data.idRoom] = [];
      }
      playersInRoom[data.idRoom].push({ id: socket.id, name: data.name, user:data.user, idUser: data.user.id, owner: data.owner })
      io.to(data.idRoom).emit("playersInRoom", playersInRoom[data.idRoom] )
      console.log(`Se ha creado el room con id: ${data.idRoom} y el usuario : ${data.name}`);
  });
  socket.on('join-room', (data) => {
    if (data) {
    socket.join(data.idRoom);
    playersInRoom[data.idRoom].push({ id: socket.id, name: data.user.name, user: data.user, idUser: data.user.id, owner: data.owner })
    io.to(data.idRoom).emit("playersInRoom", playersInRoom[data.idRoom] )
    console.log(`Se ha unido al room con id: ${data.idRoom} el usuario : ${data.user.name}`);
  } else {
    console.log("Error al emitir el evento")
  }
  });
  socket.on('leave-room', (data) => {
    console.log("data1",data)
    const playeinRoomLeavePlayer =  playersInRoom[data.idRoom].filter((item: any) => item.idUser !== data.idUser)
    console.log("playeinRoomLeavePlayer",playeinRoomLeavePlayer)
    playersInRoom[data.idRoom] = playeinRoomLeavePlayer
    console.log("playeinRoomLeavePlayer",playersInRoom[data.idRoom])
    if (playersInRoom[data.idRoom].length > 0 && !playersInRoom[data.idRoom][0].owner) {playersInRoom[data.idRoom][0].owner = true}
    if (playersInRoom[data.idRoom].length === 0 ) { 
      console.log("playersInRoom[data.idRoom] lenght",playersInRoom)
      delete playersInRoom[data.idRoom]
      console.log("playersInRoom[data.idRoom] lenght",playersInRoom)
    }
    io.to(data.idRoom).emit("playersInRoom", playersInRoom[data.idRoom] )
  })
  socket.on("disconnect", () => {
    console.log(`usuario desconectado`)
  });
});



