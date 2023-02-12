
import { Route, Tags, Body, Post } from 'tsoa'
import { ICrudOperationsController } from '../../utils/controllers/crudOperationsController';
import { ResponseApi } from '../../interfaces/responseApi';
import {facebookLoginServiceInstance} from './facebooklogin.services'
import { User } from '../user/user.model';
import { ErrorException } from '../../interfaces';


@Route("facebook")
@Tags("Facebook")
export class FacebookLoginController implements ICrudOperationsController {

    constructor(private readonly service = facebookLoginServiceInstance) { }
    @Post("/login")
    async LoginFacebook(@Body() datos: any): Promise<ResponseApi<User[] | ErrorException> | User> {
        const data = await this.service.LoginFacebook(datos)
        return { data };
    }

}
export const facebookLoginControllerInstance = new FacebookLoginController();