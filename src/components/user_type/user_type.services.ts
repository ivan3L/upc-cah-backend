import { CrudService } from '../../utils/database/crudService';
import { user_typeRepositoryInstance } from './user_type.db';
import { User_Type, User_TypeDto, User_TypeUpdate } from './user_type.model';

export class User_typeService extends CrudService<User_Type, User_TypeDto, User_TypeUpdate> {

  constructor() {
    super(user_typeRepositoryInstance)
  }
}

export const user_typeServiceInstance = new User_typeService();