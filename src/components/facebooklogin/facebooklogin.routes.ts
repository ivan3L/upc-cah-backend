import { Router } from "express";
import { ErrorException } from "../../interfaces";
import {facebookLoginControllerInstance}  from "./facebooklogin.controllers";



const router = Router()


router.post('/login', async (req, res, next) => {
    try{
        const datos = req.body
        const data = await facebookLoginControllerInstance.LoginFacebook(datos)
        if (data instanceof ErrorException) return res.status(500).json(data)
        return res.status(200).json(data)
    } catch(error) {
        next(error)
    }
})

export default router