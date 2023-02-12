import { CrudService } from '../../utils/database/crudService';
import { black_cardRepositoryInstance } from './black_card.db';
import { Black_Card, Black_CardDto, Black_CardUpdate } from './black_card.model';

export class Black_CardService extends CrudService<Black_Card, Black_CardDto, Black_CardUpdate> {

  constructor() {
    super(black_cardRepositoryInstance)
  }
}

export const black_cardServiceInstance = new Black_CardService();