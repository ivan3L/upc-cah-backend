import { Router } from 'express';
import { deckControllerInstance } from './deck.controllers';
import { ErrorException } from '../../interfaces';
import { DeckDto, DeckUpdate } from './deck.model';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await deckControllerInstance.retrieve(req)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try{
        const param = req.body as DeckDto
        console.log(param)
        const data = await deckControllerInstance.create(param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { id } = req.query as any
        const param = req.body as DeckUpdate
        const data = await deckControllerInstance.update(id!, param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

export default router