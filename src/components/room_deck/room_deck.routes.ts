import { Router } from 'express';
import { room_deckControllerInstance } from './room_deck.controllers';
import { ErrorException } from '../../interfaces';
import { Room_DeckDto, Room_DeckUpdate } from './room_deck.model';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await room_deckControllerInstance.retrieve(req)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try{
        const param = req.body as Room_DeckDto
        console.log(param)
        const data = await room_deckControllerInstance.create(param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { id } = req.query as any
        const param = req.body as Room_DeckUpdate
        const data = await room_deckControllerInstance.update(id!, param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

export default router