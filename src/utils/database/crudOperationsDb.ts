import { ErrorException } from "../../interfaces";

export interface ICrudOperationsDb {
    retrieve(param: Partial<any>): Promise<any[] | ErrorException>;
    create(param: any): Promise<any | ErrorException>;
    update(id:  any, param: any): Promise<any | ErrorException>
}