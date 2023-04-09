import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { roomModel } from "./models/rooms";
import { PlayerInRoomModel } from "./interfaces/PlayerInRoom";
import { GameModel } from "./interfaces/Game";
const server = http.createServer(app);
const port = 8080;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(port, () => {
  console.log(`Server started on port 8080`);
});
let rooms: roomModel[] = [];
const playersInRoom: PlayerInRoomModel = {};
const games: GameModel = {};

//Cliente se conecta
try {
  io.on("connection", function (socket) {
    //Log Cliente conectado
    console.log("Nuevo cliente conectado");

    //Evento crear-room
    socket.on("crear-room", (data) => {
      rooms.push({
        roomName: `room-${data.roomName}`,
        players: [socket.id],
        namePlayer: [data.name],
      });
      socket.join(data.idRoom);
      if (!playersInRoom[data.idRoom]) {
        playersInRoom[data.idRoom] = [];
      }
      playersInRoom[data.idRoom].push({
        id: socket.id,
        name: data.name,
        user: data.user,
        idUser: data.user.id,
        owner: data.owner,
        cartaElegida: "null",
      });
      const newPlayer =
        playersInRoom[data.idRoom][playersInRoom[data.idRoom].length - 1];
      io.to(data.idRoom).emit("playersInRoom", {
        playersInRoom: playersInRoom[data.idRoom],
        newPlayer: newPlayer,
      });
      console.log(
        `Se ha creado el room con id: ${data.idRoom} y el usuario : ${data.name}`
      );
    });

    //Evento join-room
    socket.on("join-room", (data) => {
      if (data) {
        console.log("data", data);
        socket.join(data.idRoom);
        playersInRoom[data.idRoom].push({
          id: socket.id,
          name: data.user.name,
          user: data.user,
          idUser: data.user.id,
          owner: data.owner,
          cartaElegida: "null",
        });
        // const newPlayer =
        //   playersInRoom[data.idRoom][playersInRoom[data.idRoom].length - 1];
        io.to(data.idRoom).emit("playersInRoom", {
          playersInRoom: playersInRoom[data.idRoom],
        });
        console.log(
          `Se ha unido al room con id: ${data.idRoom} el usuario : ${data.user.name}`
        );
      } else {
        console.log("Error al emitir el evento");
      }
    });

    //Evento leave-room
    socket.on("leave-room", (data) => {
      console.log("data1", data);
      const playeinRoomLeavePlayer = playersInRoom[data.idRoom].filter(
        (item: any) => item.idUser !== data.idUser
      );
      console.log("playeinRoomLeavePlayer", playeinRoomLeavePlayer);
      playersInRoom[data.idRoom] = playeinRoomLeavePlayer;
      console.log("playeinRoomLeavePlayer", playersInRoom[data.idRoom]);
      if (
        playersInRoom[data.idRoom].length > 0 &&
        !playersInRoom[data.idRoom][0].owner
      ) {
        playersInRoom[data.idRoom][0].owner = true;
      }
      if (playersInRoom[data.idRoom].length === 0) {
        console.log("playersInRoom[data.idRoom] lenght", playersInRoom);
        delete playersInRoom[data.idRoom];
        console.log("playersInRoom[data.idRoom] lenght", playersInRoom);
      }
      io.to(data.idRoom).emit("playersInRoom", playersInRoom[data.idRoom]);
    });

    //Evento start-game
    socket.on("start-game", (data) => {
      //recibe idRoom y rounds
      console.log("data", data);
      // Se crea game
      if (!games[data.idRoom]) {
        games[data.idRoom] = [];
      }
      //Se envía al cliente la variable game con idroom, rondas, rondaactual y el player que es czar
      games[data.idRoom].push({
        id: data.idRoom,
        rounds: data.rounds,
        rondaActual: 1,
        czar: playersInRoom[data.idRoom][0],
        czarIndex: 0,
      });
      console.log(games[data.idRoom]);
      io.to(data.idRoom).emit("moveToStartGame", data.idRoom);

      io.to(data.idRoom).emit("start-game", games[data.idRoom][0]);
      //Se espera 30 segundos y se envían las respuestas elegidas por los usuarios
      setTimeout(() => {
        io.to(data.idRoom).emit("round-ended", playersInRoom[data.idRoom]);
      }, 30000);
    });

    //Evento answer-selection
    socket.on("answer-selection", (data) => {
      //recibe estructura user y carta elegida como "whiteCard"
      console.log("data", data);
      //Se setea carta elegida por el usuario en el arreglo de usuarios
      playersInRoom[data.idRoom][data.user.id].seleccionActual = data.whiteCard;
      console.log(
        "carta elegida: ",
        playersInRoom[data.idRoom][data.user.id].seleccionActual
      );
      //No se retorna nada ya que el evento solo sirve para recopilar las respuestas,
      //el total de respuesta se envía a través de "round-ended" que es un evento que
      //debe estar escuchándose en el cliente(front)
    });

    //Evento new-round
    socket.on("new-round", (data) => {
      console.log("data", data);
      //Se suma 1 ronda
      games[data.idRoom].rondaActual = games[data.idRoom].rondaActual + 1;
      //Se cambia de zar (si ya todos fueron zar, se regresa al zar inicial)
      if (
        games[data.idRoom].czarIndex + 1 <
        playersInRoom[data.idRoom].length
      ) {
        games[data.idRoom].czarIndex = games[data.idRoom].czarIndex + 1;
      } else {
        games[data.idRoom].czarIndex = 0;
      }
      //Se envía al cliente la variable game con idroom, rondas, rondaactual y el player que es czar
      console.log(games[data.idRoom]);
      io.to(data.idRoom).emit("new-round", games[data.idRoom]);
      //Se espera 30 segundos y se envían las respuestas elegidas por los usuarios
      setTimeout(() => {
        io.to(data.idRoom).emit("round-ended", playersInRoom[data.idRoom]);
      }, 30000);
    });

    //Evento disconnect
    socket.on("disconnect", () => {
      console.log(`usuario desconectado`);
    });
  });
} catch (error) {
  console.log(error);
}
