import { BaseModel, IdUserCreated } from "../../utils/database/baseModel";

export interface White_CardModel{

    answer?: string
    is_correct?: boolean
    black_card_id?: number
}


export interface White_CardDto extends White_CardModel, IdUserCreated {}
export interface White_Card extends Required<BaseModel>, White_CardModel {}
export interface White_CardUpdate extends Partial<White_Card> {}