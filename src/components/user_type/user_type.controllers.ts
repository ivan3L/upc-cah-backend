import express from 'express'
import { Get, Query, Route, Tags, Request, Body, Patch, Post } from 'tsoa'
import { User_Type, User_TypeDto, User_TypeUpdate } from './user_type.model';

import { ErrorException } from '../../interfaces';
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import { user_typeServiceInstance } from './user_type.services';

@Route("user_type")
@Tags("User_Type")
export class User_TypeController implements ICrudOperationsController {

    constructor(private readonly service = user_typeServiceInstance) { }

    @Get()
    async retrieve(@Request() req: express.Request): Promise<ResponseApi<User_Type[]>> {
        const data = await this.service.retrieve(req.query as Partial<User_Type>)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Post()
    async create(@Body() param: User_TypeDto): Promise<ResponseApi<User_Type>> {
        const data = await this.service.create(param)
        console.log("controller",data)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Patch()
    async update(@Query() id: number, @Body() param: User_TypeUpdate): Promise<ResponseApi<User_Type>> {
        const data = await this.service.update({ ...param, id })
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
}
export const user_typeControllerInstance = new User_TypeController();