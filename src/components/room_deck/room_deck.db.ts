import { CrudRepository } from "../../utils/database/crudRepository";
import { Room_Deck, Room_DeckDto, Room_DeckUpdate } from "./room_deck.model";

export class Room_DeckRepository extends CrudRepository<Room_Deck, Room_DeckDto, Room_DeckUpdate> {

  constructor() {
      super("room_deck");
  }

}

export const room_deckRepositoryInstance = new Room_DeckRepository();