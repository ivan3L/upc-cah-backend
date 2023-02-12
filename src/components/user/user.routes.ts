import { Router } from 'express';
import { userControllerInstance } from './user.controllers';
import { UserDto, UserUpdate } from './user.model';
import { ErrorException } from '../../interfaces';

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const data = await userControllerInstance.retrieve(req)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try{
        const param = req.body as UserDto
        console.log(param)
        const data = await userControllerInstance.create(param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { id } = req.query as any
        const param = req.body as UserUpdate
        const data = await userControllerInstance.update(id!, param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})


export default router;