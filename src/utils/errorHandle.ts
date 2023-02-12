import { Request, Response, NextFunction } from 'express';
import errorMessages from './error_messages';
const notFound = (_: Request, res: Response, __: NextFunction) => {
    return res.status(404).json({
        status: "error",
        message: "Endpoint no encontrado."
    })
}

const general = (err: any, req: Request, res: Response, __: NextFunction) => {
    return res.status(err.httpCode || 500)
        .json({
            status: "error",
            message: err.message || errorMessages.defaultError, 
            details: err,
            stack: err.stack || null,
            request: {
                path: req.path,
                body: req.body,
                headers: req.headers,
                query: req.query
            }
        })
}

export default {
    notFound,
    general
}