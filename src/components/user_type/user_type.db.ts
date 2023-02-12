import { CrudRepository } from "../../utils/database/crudRepository";
import { User_Type, User_TypeDto, User_TypeUpdate } from "./user_type.model";

export class User_TypeRepository extends CrudRepository<User_Type, User_TypeDto, User_TypeUpdate> {

  constructor() {
      super("user_type");
  }

}

export const user_typeRepositoryInstance = new User_TypeRepository();
