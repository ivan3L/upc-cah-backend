import { Router } from 'express';
import { roomControllerInstance } from './room.controllers';
import { ErrorException } from '../../interfaces';
import { RoomDto, RoomUpdate } from './room.model';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await roomControllerInstance.retrieve(req)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try{
        const param = req.body as RoomDto
        console.log(param)
        const data = await roomControllerInstance.create(param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { id } = req.query as any
        const param = req.body as RoomUpdate
        const data = await roomControllerInstance.update(id!, param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

export default router