import { BaseModel, IdUserCreated } from "../utils/database/baseModel";

export interface GameModel {
    [id: string]: any

}
export interface GameDto extends GameModel, IdUserCreated {}
export interface Game extends Required<BaseModel>, GameModel{}
export interface GameUpdate extends Partial<Game>{}