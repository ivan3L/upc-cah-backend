import { CrudService } from '../../utils/database/crudService';
import { userRepositoryInstance } from './user.db';
import { User, UserDto, UserUpdate } from './user.model';

export class UserService extends CrudService<User, UserDto, UserUpdate> {

  constructor() {
    super(userRepositoryInstance)
  }
}

export const userServiceInstance = new UserService();