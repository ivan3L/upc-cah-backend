import { BaseModel, IdUserCreated } from "../utils/database/baseModel";

export interface PlayersCurrentWhiteCardsModel {
    [id: string]: any

}
export interface PlayersCurrentWhiteCardsDto extends PlayersCurrentWhiteCardsModel, IdUserCreated {}
export interface PlayersCurrentWhiteCards extends Required<BaseModel>, PlayersCurrentWhiteCardsModel{}
export interface PlayersCurrentWhiteCardsUpdate extends Partial<PlayersCurrentWhiteCards>{}