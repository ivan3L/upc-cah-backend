import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { roomModel } from "./models/rooms";
import { PlayerInRoomModel } from "./interfaces/PlayerInRoom";
import { GameModel } from "./interfaces/Game";
import axios from "axios";
import cors from 'cors'; // Import the cors middleware

const server = http.createServer(app);
const port = 8080;
// let BASE_URL = "http://loadbalancer.wtm-upc.online:8080";
let BASE_URL = "http://localhost:8080";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"], // Add the HTTP methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you want to allow
  },
});

app.use(
  cors({
      origin: "*",
      methods: "GET,PUT,POST",
      allowedHeaders: "*",
      exposedHeaders: "*",
      optionsSuccessStatus: 200,
  })
);
server.listen(port, () => {
  console.log(`Server started on port 8080`);
});


let rooms: roomModel[] = [];
const playersInRoom: PlayerInRoomModel = {};
const games: GameModel = {};
var blackCards: any;
var whiteCards: any;
let timerId: any
var currentCorrectWhiteCard: any

//const playersCurrentWhiteCards: PlayersCurrentWhiteCardsModel = {};

//Cliente se conecta
try {
  io.on("connection", function (socket:any) {
    //Log Cliente conectado
    console.log("Nuevo cliente conectado");

    socket.on("deleteRooms", async(room: any) => {
      console.log("DELETE GETROOMS")

    })

    socket.on("getRooms", async() => {
      console.log("EVENTO GETROOMS")
      const { data } = await axios.get(`${BASE_URL}/room`);
      io.emit("getRooms", data)
    })

    //Evento crear-room
    socket.on("crear-room", (data:any) => {
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
        cartaElegida: {},
        score: 0,
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
    socket.on("join-room", (data:any) => {
      if (data) {
        console.log("data", data);
        socket.join(data.idRoom);
        playersInRoom[data.idRoom].push({
          id: socket.id,
          name: data.user.name,
          user: data.user,
          idUser: data.user.id,
          owner: data.owner,
          cartaElegida: {},
          score: 0,
          cartasBlancas: [],
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
    socket.on("leave-room", async(data:any) => {
      //Busco el indice del jugador
      const newPlayer = {}
      const indice = playersInRoom[data.idRoom].findIndex((objeto: any) => {
        return objeto.user.id == data.idUser
      })
      console.log("data",data)
      console.log("indice",indice)
      console.log("Players", playersInRoom[data.idRoom] )
      // verifico si no es el unico jugador y si es owner
      if(playersInRoom[data.idRoom].length > 1 && playersInRoom[data.idRoom][indice].owner){
        console.log("ES OWNER")
        // si no es el unico jugador y es owner, entonces lo elimino y le pase el owner al jugador en la posición 0
        playersInRoom[data.idRoom].splice(indice,1)

        playersInRoom[data.idRoom][0].owner = true;
      } 
      else if (playersInRoom[data.idRoom].length > 1 && !playersInRoom[data.idRoom][indice].owner){ //Verifico que no sea el unico jugador y que no sea owner
        //entonces solo elimino el jugador
        console.log("no es owner")
        playersInRoom[data.idRoom].splice(indice,1)
      } else {
        //pero si es es el unico jugador, elimino el room (Buscar la manera de tambien eliminar acá en base de datos)
        console.log("Unico jugador")
        await axios.patch(`${BASE_URL}/room`, {identificador: data.idRoom})
        console.log("delete")
        const rooms = await axios.get(`${BASE_URL}/room`);
        io.emit("getRooms", rooms.data)
        delete playersInRoom[data.idRoom];
      }
      io.to(data.idRoom).emit("playersInRoom", {playersInRoom: playersInRoom[data.idRoom] , newPlayer:newPlayer});
    });

    //Evento start-game
    socket.on("start-game", async(data:any) => {
      if(playersInRoom[data.idRoom].length > 1) {     
      if(!games[data.idRoom])
      {
        console.log("creación de juego")
        blackCards = data.blackCards
        whiteCards = data.whiteCards
        // ------------LOGICA PARA inicializar LAS CARTAS BLANCAS Y NEGRA QUE SE VAN A MOSTRAR ------
        var randomBlackCardIndex = Math.floor(Math.random() * blackCards.length);
        var currentWhiteCards = whiteCards.filter((e: any) => {
          return e.black_card_id === blackCards[randomBlackCardIndex].id;
        });
        currentCorrectWhiteCard = currentWhiteCards.filter((e: any) => {
          return e.is_correct === true;
        });
        currentWhiteCards = whiteCards.filter((e: any) => {
          return e.black_card_id === blackCards[randomBlackCardIndex].id && e.is_correct === false;
        });
        // ----------------------------------------------------------------------------------
        if (!games[data.idRoom]) {
          games[data.idRoom] = [];
        }
        //Se crea la variable juego
        games[data.idRoom].push({
          id: data.idRoom,
          rounds: data.rounds,
          rondaActual: 1,
          czar: playersInRoom[data.idRoom][0],
          czarIndex: 0,
          currentBlackCard: blackCards[randomBlackCardIndex],
          currentWhiteCards: currentWhiteCards,
          currentCorrectWhiteCard: currentCorrectWhiteCard[0],
          contador: 30,
          bloqueo: false
        });
        blackCards.splice(randomBlackCardIndex,1);
        io.to(data.idRoom).emit("moveToStartGame", data.idRoom);
        await axios.patch(`${BASE_URL}/room`, {identificador: data.idRoom})
        const rooms = await axios.get(`${BASE_URL}/room`);
        io.emit("getRooms", rooms.data)
      }
       //Si se excede de la cantidad de rondas elegidas, se emite un mensaje para terminar el juego y mostrar el scoreboard. Bucle termina
       if( games[data.idRoom][0].rondaActual - 1 == games[data.idRoom][0].rounds)
      //  if( games[data.idRoom][0].rondaActual - 1 == 2)
       {
        playersInRoom[data.idRoom].sort((a : any,b: any) => b.score- a.score)
        delete games[data.idRoom];
        io.to(data.idRoom).emit("game-ended-show-final-scoreboard", playersInRoom[data.idRoom]);
        console.log("END", games[data.idRoom])
       }
       //Sino, inicia lógica del juego
       else
       {
         //Se revisa si no es ronda inicial para poder re-setear variables
         if(games[data.idRoom][0].rondaActual != 1)
         {
          console.log("nueva ronda") //Se cambia de zar (si ya todos fueron zar, se regresa al zar inicial)
          if (games[data.idRoom][0].czarIndex + 1 < playersInRoom[data.idRoom].length) {
            games[data.idRoom][0].czarIndex = games[data.idRoom][0].czarIndex + 1;
          } else {
            games[data.idRoom][0].czarIndex = 0;
          }
          games[data.idRoom][0].czar = playersInRoom[data.idRoom][games[data.idRoom][0].czarIndex];
          //------------LOGICA PARA re-setear LAS CARTAS BLANCAS Y NEGRA QUE SE VAN A MOSTRAR ------
          
          randomBlackCardIndex = Math.floor(Math.random() * blackCards.length);
          currentWhiteCards = whiteCards.filter((e: any) => {
            return e.black_card_id === blackCards[randomBlackCardIndex].id;
          });
          currentCorrectWhiteCard = currentWhiteCards.filter((e: any) => {
            return e.is_correct === true;
          });
          currentWhiteCards = whiteCards.filter((e: any) => {
            return e.black_card_id === blackCards[randomBlackCardIndex].id && e.is_correct === false;
          });
          games[data.idRoom][0].currentBlackCard = blackCards[randomBlackCardIndex];
          games[data.idRoom][0].currentWhiteCards = currentWhiteCards;
          games[data.idRoom][0].currentCorrectWhiteCard = currentCorrectWhiteCard[0];
          blackCards.splice(randomBlackCardIndex,1);

         }
         //Se suma 1 a rondaActual
         games[data.idRoom][0].rondaActual = games[data.idRoom][0].rondaActual + 1;
         //Bucle de lógica de juego. Esto ocurre desde ronda 1 hasta terminar el juego
        //Se espera 30 segundos y se envían las respuestas elegidas por los usuarios
        function ejecutarIntervalo() {
          if (games[data.idRoom][0].bloqueo) {
            return; 
          }
          games[data.idRoom][0].bloqueo = true
          games[data.idRoom][0].contador = games[data.idRoom][0].contador - 1
          io.to(data.idRoom).emit('temporizador', games[data.idRoom][0].contador);
          if (games[data.idRoom][0].contador == 0 ) {
            games[data.idRoom][0].contador = 30
          }
  
          setTimeout(() => {
            games[data.idRoom][0].bloqueo = false
            if(games[data.idRoom]){
              ejecutarIntervalo()
            }
          }, 1000)
        }

        ejecutarIntervalo()
        io.to(data.idRoom).emit("start-game", games[data.idRoom][0]);
        timerId = setTimeout(() => {
          let selectedCards = []
          for (let i = 0 ; i< playersInRoom[data.idRoom].length; i++){
            if(Object.keys(playersInRoom[data.idRoom][i].cartaElegida).length > 0) {
              selectedCards.push(playersInRoom[data.idRoom][i].cartaElegida)
              playersInRoom[data.idRoom][i].cartaElegida = {}
            }
          }
          selectedCards.push(currentCorrectWhiteCard[0])
          selectedCards.sort(() => Math.random() - 0.5);
          io.to(data.idRoom).emit("start-czar-answer-selection", selectedCards)
          for (let i = 0 ; i< playersInRoom[data.idRoom].length; i++){
            playersInRoom[data.idRoom][i].cartaElegida = {}
          }
          setTimeout(() => {
            const indice = playersInRoom[data.idRoom].findIndex((objeto: any) => {
              return objeto.user.id == games[data.idRoom][0].czar.user.id
            })
            if (games[data.idRoom][0].czar.cartaElegida.id == games[data.idRoom][0].currentCorrectWhiteCard.id) {
              playersInRoom[data.idRoom][indice].score = playersInRoom[data.idRoom][indice].score + 1
            }
            console.log("end-czar-answer-selection")
            io.to(data.idRoom).emit("end-czar-answer-selection", playersInRoom[data.idRoom]);
            setTimeout(() => {
              games[data.idRoom][0].contador = 30
              io.to(data.idRoom).emit('temporizador', games[data.idRoom][0].contador);
              io.to(data.idRoom).emit("reset-game");
            }, 5000)
          }, 30000);
        }, 30000);
       }
      } else {
        socket.emit("missingOnePlayer")
      }
    });

    //Evento answer-selection
    socket.on("answer-selection", (data:any) => {
      console.log("ANSWER")
      let next = true
      //recibe estructura user y carta elegida como "whiteCard"
      const indice = playersInRoom[data.idRoom].findIndex((objeto: any) => {
        return objeto.user.id == data.userId
      })
      playersInRoom[data.idRoom][indice].cartaElegida = data.whiteCard;
      // Logica para pasar de ronda si todos eligen
      for (let i = 0; i< playersInRoom[data.idRoom].length; i++) {
        if( i != games[data.idRoom][0].czarIndex && Object.keys(playersInRoom[data.idRoom][i].cartaElegida).length === 0) {
          next = false
        }
      }
      if (next) {
        clearTimeout(timerId)
        let selectedCards = []
        for (let i = 0 ; i< playersInRoom[data.idRoom].length; i++){
          if(Object.keys(playersInRoom[data.idRoom][i].cartaElegida).length > 0) {
            selectedCards.push(playersInRoom[data.idRoom][i].cartaElegida)
            playersInRoom[data.idRoom][i].cartaElegida = {}
          }
        }
        selectedCards.push(currentCorrectWhiteCard[0])
        // shuffle(selectedCards)
        selectedCards.sort(() => Math.random() - 0.5);
        console.log("Select-card",selectedCards)
        games[data.idRoom][0].contador = 30
        io.to(data.idRoom).emit('temporizador', games[data.idRoom][0].contador);
        io.to(data.idRoom).emit("start-czar-answer-selection", selectedCards)
        for (let i = 0 ; i< playersInRoom[data.idRoom].length; i++){
          playersInRoom[data.idRoom][i].cartaElegida = {}
        }
        setTimeout(() => {
          const indice = playersInRoom[data.idRoom].findIndex((objeto: any) => {
            return objeto.user.id == games[data.idRoom][0].czar.user.id
          })
          if (games[data.idRoom][0].czar.cartaElegida.id == games[data.idRoom][0].currentCorrectWhiteCard.id) {
            playersInRoom[data.idRoom][indice].score = playersInRoom[data.idRoom][indice].score + 1
          }
          console.log("end-czar-answer-selection")
          io.to(data.idRoom).emit("end-czar-answer-selection", playersInRoom[data.idRoom]);
          setTimeout(() => {
            games[data.idRoom][0].contador = 30
            io.to(data.idRoom).emit('temporizador', games[data.idRoom][0].contador);
            io.to(data.idRoom).emit("reset-game");
          }, 5000)
        }, 30000);
      }

      //No se retorna nada ya que el evento solo sirve para recopilar las respuestas,
      //el total de respuesta se envía a través de "start-czar-answer-selection" que es un evento que
      //debe estar escuchándose en el cliente(front)
    });


    //Evento czar-answer-selection
    socket.on("czar-answer-selection", (data:any) => {
      //recibe estructura user y carta elegida como "whiteCard" del zar
      const indice = playersInRoom[data.idRoom].findIndex((objeto: any) => {
        return objeto.user.id == data.userId
      })
      playersInRoom[data.idRoom][indice].cartaElegida = data.whiteCard;

      // if(data.whiteCard.id == games[data.idRoom][0].currentCorrectWhiteCard.id){
      //   playersInRoom[data.idRoom][data.userId].score =  playersInRoom[data.idRoom][data.userId].score + 1
      // }
      
      
      //No se retorna nada ya que el evento solo sirve para recopilar las respuestas,
      //el total de respuesta se envía a través de "end-czar-answer-selection" que es un evento que
      //debe estar escuchándose en el cliente(front)
    });

    // socket.on('decrementarTemporizador', (data: any) => {
    //   console.log("decrementar",data)
    //   games[data.idRoom][0].contador = games[data.idRoom][0].contador - 1
    //   if (games[data.idRoom][0].contador < 0) {
    //     games[data.idRoom][0].contador = 30; // Reiniciar el temporizador a 30 cuando llegue a 0
    //   }
    //   // Emitir el nuevo valor del temporizador a todos los clientes conectados
    //   io.emit('temporizador', games[data.idRoom][0].contador);
    // });



    //Evento disconnect
    socket.on("disconnect", () => {
      console.log(`usuario desconectado`);
    });
  });
} catch (error) {
  console.log(error);
}
