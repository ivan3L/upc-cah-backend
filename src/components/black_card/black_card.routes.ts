import { Router } from 'express';
import { black_cardControllerInstance } from './black_card.controllers';
import { ErrorException } from '../../interfaces';
import { Black_CardDto, Black_CardUpdate } from './black_card.model';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await black_cardControllerInstance.retrieve()
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try{
        const param = req.body as Black_CardDto
        console.log(param)
        const data = await black_cardControllerInstance.create(param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { id } = req.query as any
        const param = req.body as Black_CardUpdate
        const data = await black_cardControllerInstance.update(id!, param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

export default router