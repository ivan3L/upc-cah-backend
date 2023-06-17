import { Router } from 'express';
import { idText } from 'typescript';

const router = Router();

let aux = 0;

let room = [];

router.get('/', async (req, res, next) => {
  try {

    aux = aux + 1;
    console.log('used /test endpoint - ', aux);

    //Create room
    console.log('el usuario está creando 1 room - ', aux);

    room.append(
      [
        idText
        name,
        password
      ]
    )
    
    //Explore rooms
  
    axios get /room
  
    //start-game
  
    console.log(el usuario X inició la partida)
    room.game.append(
      [
        duration:10
        rounds: 7
      ]

    )

    axios get /room

    // Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('el usuario creó 1 room - ', aux);

    // Terminate test
    res.end();
  } catch (error) {
    next(error);
  }
});
export default router;
