import { CrudRepository } from "../../utils/database/crudRepository";
import { Black_Card, Black_CardDto, Black_CardUpdate } from "./black_card.model";

export class Black_CardRepository extends CrudRepository<Black_Card, Black_CardDto, Black_CardUpdate> {

  constructor() {
      super("black_card");
  }

}

export const black_cardRepositoryInstance = new Black_CardRepository();