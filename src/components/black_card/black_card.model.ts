import { BaseModel, IdUserCreated } from "../../utils/database/baseModel";

export interface Black_CardModel {
    question?: string
    deck_id?: number
}

export interface Black_CardDto extends Black_CardModel, IdUserCreated {}
export interface Black_Card extends Required<BaseModel>, Black_CardModel{}
export interface Black_CardUpdate extends Partial<Black_Card>{}