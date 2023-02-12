import express from 'express'
import { Get, Query, Route, Tags, Request, Body, Patch, Post } from 'tsoa'
import { White_Card, White_CardDto, White_CardUpdate } from './white_card.model';

import { ErrorException } from '../../interfaces';
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import { white_cardServiceInstance } from './white_card.services';

@Route("white_card")
@Tags("White_Card")
export class White_CardController implements ICrudOperationsController {

    constructor(private readonly service = white_cardServiceInstance) { }

    @Get()
    async retrieve(@Request() req: express.Request): Promise<ResponseApi<White_Card[]>> {
        const data = await this.service.retrieve(req.query as Partial<White_Card>)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Post()
    async create(@Body() param: White_CardDto): Promise<ResponseApi<White_Card>> {
        const data = await this.service.create(param)
        console.log("controller",data)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Patch()
    async update(@Query() id: number, @Body() param: White_CardUpdate): Promise<ResponseApi<White_Card>> {
        const data = await this.service.update({ ...param, id })
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
}
export const white_cardControllerInstance = new White_CardController();