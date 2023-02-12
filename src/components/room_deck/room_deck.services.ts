import { CrudService } from '../../utils/database/crudService';
import { room_deckRepositoryInstance } from './room_deck.db';
import { Room_Deck, Room_DeckDto, Room_DeckUpdate } from './room_deck.model';

export class Room_DeckService extends CrudService<Room_Deck, Room_DeckDto, Room_DeckUpdate> {

  constructor() {
    super(room_deckRepositoryInstance)
  }
}

export const room_deckServiceInstance = new Room_DeckService();