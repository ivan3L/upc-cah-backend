export interface Model {
    status?: number
    created_by?: number
    updated_by?: number
    deleted_by?: number
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
}
export interface BaseModel extends Model, IdUserCreated, IdUserUpdated, IdUserDeleted {
    id?: number;
}

export interface BaseModelString extends Model, IdUserCreated, IdUserUpdated, IdUserDeleted {
    id?: string;
}

export interface IdUserCreated {
    created_by?: number
}

export interface IdUserUpdated {
    updated_by?: number
}

export interface IdUserDeleted {
    deleted_usr?: number
}