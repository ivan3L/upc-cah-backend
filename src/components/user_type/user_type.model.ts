import { BaseModel, IdUserCreated } from "../../utils/database/baseModel";

export interface User_TypeModel{

    name?: string
}


export interface User_TypeDto extends User_TypeModel, IdUserCreated {}
export interface User_Type extends Required<BaseModel>, User_TypeModel {}
export interface User_TypeUpdate extends Partial<User_Type> {}