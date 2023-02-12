import app from "./app";
import http from "http";
import { Server } from "socket.io";
import {roomModel} from './models/rooms'
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

io.on("connection", function (socket) {
  console.log("Nuevo cliente conectado");

  socket.on('crear-room', (data) => {
      rooms.push({ roomName: `room-${data.identificador}`, players: [socket.id], namePlayer:[data.name] });
      socket.join(data.identificador);
      console.log(`Cliente unido al room: ${data.identificador} con el nombre de: ${data.namePlayer}`);
  });
  socket.on('join-room', (data) => {
    console.log("Entra", data)
    socket.join(data.roomName);
    console.log(`Cliente unido al room ${data.roomName} con el nombre de ${data.namePlayer} `)
  });
  socket.on("disconnect", function () {
    console.log("Cliente desconectado");
  });
});


