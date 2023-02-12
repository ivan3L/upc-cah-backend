import { ErrorException } from "../../interfaces";
import { IdUserCreated, IdUserUpdated } from "./baseModel"
import { CrudRepository } from "./crudRepository"

export class CrudService<M, DTO extends IdUserCreated, UPDATE extends IdUserUpdated, TypeId = number>  {

    constructor(public repository: CrudRepository<M, DTO, UPDATE, TypeId>) { 
                
    }

    async retrieve(param: Partial<M> = {}): Promise<ErrorException | M[]> {
        return await this.repository.retrieve(param);
    }
    async create(param: DTO): Promise<M | ErrorException> {
        return await this.repository.create(param);
    }
    async update(param: UPDATE): Promise<M | ErrorException> {
        return await this.repository.update(param);
    }


}