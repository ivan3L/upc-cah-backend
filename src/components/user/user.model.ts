import { BaseModel, IdUserCreated } from "../../utils/database/baseModel";

export interface UserModel {

    email_address?: string
    password?: string
    firstname?: string
    lastname?: string
    profile_picture_url?: string
    user_type_id?: number
    
}

export interface UserDto extends UserModel, IdUserCreated {}
export interface User extends Required<BaseModel>, UserModel {}
export interface UserUpdate extends Partial<User> {}
