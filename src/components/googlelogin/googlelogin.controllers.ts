
import { Route, Tags, Body, Post } from 'tsoa'
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import {googleLoginServiceInstance} from './googlelogin.services'
import { User } from '../user/user.model';
import { ErrorException } from '../../interfaces';


@Route("google")
@Tags("google")
export class GoogleLoginController implements ICrudOperationsController {

    constructor(private readonly service = googleLoginServiceInstance) { }
    @Post("/login")
    async LoginGoogle(@Body() datos: any): Promise<ResponseApi<User[] | ErrorException> | User> {
        const data = await this.service.LoginGoogle(datos)
        return { data };
    }

}
export const googleLoginControllerInstance = new GoogleLoginController();