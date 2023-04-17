
import { CrudService } from '../../utils/database/crudService';
import { black_cardRepositoryInstance } from './black_card.db';
import { Black_Card, Black_CardDto, Black_CardUpdate } from './black_card.model';
import {white_cardServiceInstance} from '../white_card/white_card.services'
import { ErrorException } from '../../interfaces';

export class Black_CardService extends CrudService<Black_Card, Black_CardDto, Black_CardUpdate> {

  constructor(private readonly whiteService = white_cardServiceInstance) {
    
    super(black_cardRepositoryInstance)
  }

  //HACER QUE BLACKCARD SEA RANDOM
  async retrieve(): Promise<any> {
    const blackCard = await this.repository.retrieve()
    if (blackCard instanceof ErrorException) return blackCard;
    const whiteCard = await this.whiteService.retrieve({
      black_card_id: blackCard[0].id
    })
    if (whiteCard instanceof ErrorException) return whiteCard;
    const cards: any = []
    cards.push(blackCard)
    cards.push(whiteCard)
    // cards.black = blackCard
    // cards.white = whiteCard
    return cards
  }
}

export const black_cardServiceInstance = new Black_CardService();