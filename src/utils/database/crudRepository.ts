import { Pool } from "pg"
import { ErrorException, Logs } from "../../interfaces"
import pool2 from "../../services/db"
import { getQueryCreateSql, getQueryRetriveAllSql, getQueryUpdateSql } from "../generateNameFunctionSql"
import { IdUserCreated, IdUserUpdated } from "./baseModel"
import { ICrudOperationsDb } from "./crudOperationsDb"


export class CrudRepository<M, DTO extends IdUserCreated, UPDATE extends IdUserUpdated, TypeId = number> implements ICrudOperationsDb {

  constructor(public nameTable: string, public pool: Pool = pool2) {}

  // async retrieveOne(id: TypeId): Promise<M | ErrorException> {
  //     try {
  //         const { rows } = await this.pool.query(getQueryRetriveSql(this.nameTable), [id])
  //         const { data, error, logs } = rows[0].query as { data: M[], error: Error[], logs: Logs[] }
  //         if (logs.length > 0) console.log({ logs })
  //         if (error.length > 0) throw error[0]
  //         return data[0]
  //     } catch (error: any) {
  //         console.log('*error retrieving type:', error)
  //         return new ErrorException(error.code, error.name, error.context)
  //     }
  // }

  async retrieve(param: Partial<M> = {}): Promise<M[] | ErrorException> {
    try {
      const { rows } = await this.pool.query(getQueryRetriveAllSql(this.nameTable), [param])

      const { data, error, logs } = rows[0].query as { data: M[], error: Error[], logs: Logs[] }
      //console.log(rows[0].query);

      if (logs) {
        if (Object.keys(logs).length > 0) console.log({ logs })
      }
      if (error) {
        if (Object.keys(error).length > 0) throw error
      }

      if (!Array.isArray(data)) {
        return [];
      }
      return data
    } catch (error: any) {
      console.log('*error retrieving types:', error)
      return new ErrorException(error.code, error.name, error.context)
    }
  }

  async create(param: DTO): Promise<M | ErrorException> {
    try {
      const { rows } = await this.pool.query(getQueryCreateSql(this.nameTable), [param])
      const { data, error, logs } = rows[0].query as { data: M[], error: Error[], logs: Logs[] }
      console.log(rows[0].query)
      if (logs) {
        if (Object.keys(logs).length > 0) console.log({ logs })
      }
      if (error) {
        if (Object.keys(error).length > 0) throw error
      }
      if (!Array.isArray(data)) {
        return data as any;
      }
      return data[0]
    } catch (error: any) {
      console.log('*error creating repository:', error)
      return new ErrorException(error.code, error.name, error.context)
    }
  }

  async update(param: UPDATE): Promise<M | ErrorException> {
    try {

      const { rows } = await this.pool.query(getQueryUpdateSql(this.nameTable), [param])
      const { data, error, logs } = rows[0].query as { data: M[], error: Error[], logs: Logs[] }
      if (logs) {
        if (Object.keys(logs).length > 0) console.log({ logs })
      }
      if (error) {
        if (Object.keys(error).length > 0) throw error
      }

      if (!Array.isArray(data)) {
        return data as any;
      }

      return data[0]
    } catch (error: any) {
      console.log('*error updating type:', error)
      return new ErrorException(error.code, error.name, error.context)
    }
  }

  // async delete(id: TypeId, idUserDeleted: number): Promise<M | ErrorException> {
  //     try {
  //         const { rows } = await this.pool.query(getQueryDeleteSql(this.nameTable, true), [idUserDeleted, id])
  //         const { data, error, logs } = rows[0].query as { data: M[], error: Error[], logs: Logs[] }
  //         if (logs.length > 0) console.log({ logs })
  //         if (error.length > 0) throw error[0]
  //         return data[0];
  //     } catch (error: any) {
  //         console.log('*error deleting type:', error)
  //         return new ErrorException(error.code, error.name, error.context)
  //     }
  // }

}