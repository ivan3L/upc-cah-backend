import { BaseModel, IdUserCreated } from "../../utils/database/baseModel";

export interface RoomModel {
    number?: number
    name?: string
    password?: string
    max_number_player?: number
    owner_id?: number

}
export interface RoomDto extends RoomModel, IdUserCreated {}
export interface Room extends Required<BaseModel>, RoomModel{}
export interface RoomUpdate extends Partial<Room>{}