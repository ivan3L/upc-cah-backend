import { Router } from 'express';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const router = Router();
let BASE_URL = "http://localhost:8080";

let aux = 0;
let room: any = []


router.get('/', async (req, res, next) => {
  try {
    let roomTest: string = ''
    console.log(`------------------ROOM:${aux}------------------`)
    let userRoom = [{name: 'userTest - 1', score: 0}]
    aux = aux + 1;
    console.log('used /test endpoint - ', aux);
    //Obtener los rooms del lobby
    const  {data} = await axios.get(`${BASE_URL}/room`);
    room = data.data
    console.log('Rooms disponibles en el lobby',room.length)
    //Create room
    const body = {
        name: `RoomPrueba - ${aux}`,
        password: '123',
        max_number_player: 3,
        number: 1,
        owner_id: 1,
        identificador: uuidv4(),
        rounds: 2,
    }
    roomTest = body.identificador
    await axios.post(`${BASE_URL}/room`, body);
    console.log(`El room ha sido creado: ${body.identificador}`)
    console.log(`Numero de usuarios en el room: ${userRoom.length}`)
    console.log(`Uniendo a un usuario TEST`)
    userRoom.push({name: 'userTest - 2', score: 0})
    console.log(`Uniendo a un usuario TEST`)
    userRoom.push({name: 'userTest - 3', score: 0})
    console.log(`Numero de usuarios en el room: ${userRoom.length}`)
    console.log('Start Game')
    const  black_card = await axios.get(`${BASE_URL}/black_card`);
    const  whiteCard = await axios.get(`${BASE_URL}/white_card`);
    console.log(`Cartas negras obtenidas: ${black_card.data.data.length}`)
    console.log(`Cartas blancas obtenidas: ${whiteCard.data.data.length}`)
    console.log(`Ronda numero 1`)
    let randomIndex = Math.floor(Math.random() * userRoom.length);
    userRoom[randomIndex].score = userRoom[randomIndex].score + 1
    console.log(`Ronda numero 2`)
    let randomIndex2 = Math.floor(Math.random() * userRoom.length);
    userRoom[randomIndex2].score = userRoom[randomIndex2].score + 1
    userRoom.sort((a, b) => b.score - a.score);
    console.log(`scoreboard`, userRoom)
    await axios.patch(`${BASE_URL}/room`, {identificador: roomTest})
    console.log(`Room con identificador ${roomTest} Eliminado`)
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Terminate test



    res.end();
  } catch (error) {
    next(error);
  }
});

export default router;
