import { BaseModel, IdUserCreated } from "../../utils/database/baseModel";

export interface DeckModel {
    name?: string
}

export interface DeckDto extends DeckModel, IdUserCreated {}
export interface Deck extends Required<BaseModel>, DeckModel{}
export interface DeckUpdate extends Partial<Deck>{}