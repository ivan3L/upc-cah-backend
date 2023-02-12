import { CrudService } from '../../utils/database/crudService';
import { white_cardRepositoryInstance } from './white_card.db';
import { White_Card, White_CardDto, White_CardUpdate } from './white_card.model';

export class White_CardService extends CrudService<White_Card, White_CardDto, White_CardUpdate> {

  constructor() {
    super(white_cardRepositoryInstance)
  }
}

export const white_cardServiceInstance = new White_CardService();