import { CrudRepository } from "../../utils/database/crudRepository";
import { Deck, DeckDto, DeckUpdate } from "./deck.model";

export class DeckRepository extends CrudRepository<Deck, DeckDto, DeckUpdate> {

  constructor() {
      super("deck");
  }

}

export const deckRepositoryInstance = new DeckRepository();