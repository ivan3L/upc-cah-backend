import express from 'express'
import { Get, Query, Route, Tags, Request, Body, Patch, Post } from 'tsoa'
import { User, UserDto, UserUpdate } from './user.model';

import { ErrorException } from '../../interfaces';
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import { userServiceInstance } from './user.services';

@Route("user")
@Tags("User")
export class UserController implements ICrudOperationsController {

    constructor(private readonly service = userServiceInstance) { }

    @Get()
    async retrieve(@Request() req: express.Request): Promise<ResponseApi<User[]> | ErrorException> {
        //const {id} = req.query as User
        const data = await this.service.retrieve(req.query as Partial<User>)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Post()
    async create(@Body() param: UserDto): Promise<ResponseApi<User>> {
        const data = await this.service.create(param)
        console.log("controller",data)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Patch()
    async update(@Query() id: number, @Body() param: UserUpdate): Promise<ResponseApi<User>> {
        const data = await this.service.update({ ...param, id })
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
}
export const userControllerInstance = new UserController();
