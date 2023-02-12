import express from 'express'
import { Get, Query, Route, Tags, Request, Body, Patch, Post } from 'tsoa'
import { Room_Deck,Room_DeckDto,Room_DeckUpdate } from './room_deck.model'
import { ErrorException } from '../../interfaces';
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import { room_deckServiceInstance } from './room_deck.services';


@Route("room_deck")
@Tags("Room_Deck")
export class Room_DeckController implements ICrudOperationsController {

    constructor(private readonly service = room_deckServiceInstance) { }
    @Get()
    async retrieve(@Request() req: express.Request): Promise<ResponseApi<Room_Deck[]>> {
        const data = await this.service.retrieve(req.query as Partial<Room_Deck>)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
    @Post()
    async create(@Body() param: Room_DeckDto): Promise<ResponseApi<Room_Deck>> {
        const data = await this.service.create(param)
        console.log("controller",data)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
    @Patch()
    async update(@Query() id: number, @Body() param: Room_DeckUpdate): Promise<ResponseApi<Room_Deck>> {
        const data = await this.service.update({ ...param, id })
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

}
export const room_deckControllerInstance = new Room_DeckController();