import { CrudRepository } from "../../utils/database/crudRepository";
import { User, UserDto, UserUpdate } from "./user.model";

export class UserRepository extends CrudRepository<User, UserDto, UserUpdate> {

  constructor() {
      super("user");
  }

}

export const userRepositoryInstance = new UserRepository();
