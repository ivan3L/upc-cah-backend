import { BaseModel, IdUserCreated } from "../utils/database/baseModel";

export interface PlayerInRoomModel {
    [id: string]: any

}
export interface PlayerInRoomDto extends PlayerInRoomModel, IdUserCreated {}
export interface PlayerInRoom extends Required<BaseModel>, PlayerInRoomModel{}
export interface PlayerInRoomUpdate extends Partial<PlayerInRoom>{}