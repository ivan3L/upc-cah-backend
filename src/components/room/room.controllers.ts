import express from 'express'
import { Get, Query, Route, Tags, Request, Body, Patch, Post } from 'tsoa'
import { Room,RoomDto,RoomUpdate } from './room.model'
import { ErrorException } from '../../interfaces';
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import { roomServiceInstance } from './room.services';


//import { Socket } from 'socket.io';


@Route("room")
@Tags("Room")
export class RoomController implements ICrudOperationsController {

    constructor(private readonly service = roomServiceInstance) { }
    @Get()
    async retrieve(@Request() req: express.Request): Promise<ResponseApi<Room[]>> {
        const data = await this.service.retrieve(req.query as Partial<Room>)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
    @Post()
    async create(@Body() param: RoomDto): Promise<ResponseApi<Room>> {
        const data = await this.service.create(param)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
    @Patch()
    async update(@Query() id: number, @Body() param: RoomUpdate): Promise<ResponseApi<Room>> {
        const data = await this.service.update({ ...param, id })
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

}
export const roomControllerInstance = new RoomController();