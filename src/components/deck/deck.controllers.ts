import express from 'express'
import { Get, Query, Route, Tags, Request, Body, Patch, Post } from 'tsoa'
import { Deck, DeckDto, DeckUpdate } from './deck.model';

import { ErrorException } from '../../interfaces';
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import { deckServiceInstance } from './deck.services';

@Route("deck")
@Tags("Deck")
export class DeckController implements ICrudOperationsController {

    constructor(private readonly service = deckServiceInstance) { }

    @Get()
    async retrieve(@Request() req: express.Request): Promise<ResponseApi<Deck[]>> {
        const data = await this.service.retrieve(req.query as Partial<Deck>)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Post()
    async create(@Body() param: DeckDto): Promise<ResponseApi<Deck>> {
        const data = await this.service.create(param)
        console.log("controller",data)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Patch()
    async update(@Query() id: number, @Body() param: DeckUpdate): Promise<ResponseApi<Deck>> {
        const data = await this.service.update({ ...param, id })
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
}
export const deckControllerInstance = new DeckController();