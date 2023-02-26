import { BaseModel, IdUserCreated } from "../utils/database/baseModel";

export interface PlayerModel {
    name: string

}
export interface PlayerDto extends PlayerModel, IdUserCreated {}
export interface Player extends Required<BaseModel>, PlayerModel{}
export interface PlayerUpdate extends Partial<Player>{}