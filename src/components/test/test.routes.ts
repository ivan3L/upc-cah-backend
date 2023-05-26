import { Router } from 'express';

const router = Router();
let aux = 0

router.get('/', async (req, res, next) => {
    try {
        //Inicia Test
        aux = aux+1
        console.log('used /test endpoint - ', aux);
        //Se conecta 
        
        // 5s... Crea room

        // 3s... Inicia juego (start-game)

        // 5s x 5 rondas (utilizar los métodos necesarios para simular las rondas)

        // Finalizar partida (show-scoreboard)

        //Usuario se desconecta

        //Termina Test
        res.end();
    } catch (error) {
        next(error);
    }
});

export default router;