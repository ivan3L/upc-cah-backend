import { Router } from 'express';
import { user_typeControllerInstance } from './user_type.controllers';
import { User_TypeDto, User_TypeUpdate } from './user_type.model';
import { ErrorException } from '../../interfaces';

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const data = await user_typeControllerInstance.retrieve(req)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})
router.post('/', async(req, res, next) => {
    try{
        const param = req.body as User_TypeDto
        console.log(param)
        const data = await user_typeControllerInstance.create(param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const { id } = req.query as any
        const param = req.body as User_TypeUpdate
        const data = await user_typeControllerInstance.update(id!, param)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})


export default router;