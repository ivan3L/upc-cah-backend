import { Router } from 'express';
import { white_cardControllerInstance } from './white_card.controllers';
import { White_CardDto, White_CardUpdate } from './white_card.model';
import { ErrorException } from '../../interfaces';

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const data = await white_cardControllerInstance.retrieve(req)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try{
        const param = req.body as White_CardDto
        console.log(param)
        const data = await white_cardControllerInstance.create(param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { id } = req.query as any
        const param = req.body as White_CardUpdate
        const data = await white_cardControllerInstance.update(id!, param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})


export default router;