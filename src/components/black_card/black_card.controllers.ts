
import { Get, Query, Route, Tags, Body, Patch, Post } from 'tsoa'
import { Black_Card, Black_CardDto, Black_CardUpdate } from './black_card.model';

import { ErrorException } from '../../interfaces';
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import { black_cardServiceInstance } from './black_card.services';

@Route("black_card")
@Tags("Black_Card")
export class Black_CardController implements ICrudOperationsController {

    constructor(private readonly service = black_cardServiceInstance) { }

    @Get()
    async retrieve(): Promise<any> {
        const data = await this.service.retrieve()
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Post()
    async create(@Body() param: Black_CardDto): Promise<ResponseApi<Black_Card>> {
        const data = await this.service.create(param)
        console.log("controller",data)
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }

    @Patch()
    async update(@Query() id: number, @Body() param: Black_CardUpdate): Promise<ResponseApi<Black_Card>> {
        const data = await this.service.update({ ...param, id })
        if (data instanceof ErrorException) return { error: data.error };
        return { data };
    }
}
export const black_cardControllerInstance = new Black_CardController();