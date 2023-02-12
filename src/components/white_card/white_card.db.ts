import { CrudRepository } from "../../utils/database/crudRepository";
import { White_Card, White_CardDto, White_CardUpdate } from "./white_card.model";

export class White_CardRepository extends CrudRepository<White_Card, White_CardDto, White_CardUpdate> {

  constructor() {
      super("white_card");
  }

}

export const white_cardRepositoryInstance = new White_CardRepository();
