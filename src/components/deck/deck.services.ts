import { CrudService } from '../../utils/database/crudService';
import { deckRepositoryInstance } from './deck.db';
import { Deck, DeckDto, DeckUpdate } from './deck.model';

export class DeckService extends CrudService<Deck, DeckDto, DeckUpdate> {

  constructor() {
    super(deckRepositoryInstance)
  }
}

export const deckServiceInstance = new DeckService();