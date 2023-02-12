import { BaseModel, IdUserCreated } from "../../utils/database/baseModel";

export interface Room_DeckModel {
    room_id?: number
    deck_id?: number

}
export interface Room_DeckDto extends Room_DeckModel, IdUserCreated {}
export interface Room_Deck extends Required<BaseModel>, Room_DeckModel{}
export interface Room_DeckUpdate extends Partial<Room_Deck>{}