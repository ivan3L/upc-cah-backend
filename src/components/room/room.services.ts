import { ErrorException } from '../../interfaces';
import { CrudService } from '../../utils/database/crudService';
import { roomRepositoryInstance } from './room.db';
import { Room, RoomDto, RoomUpdate } from './room.model';

export class RoomService extends CrudService<Room, RoomDto, RoomUpdate> {

  constructor() {
    super(roomRepositoryInstance)
  }
  async retrieve(): Promise<Room[] | ErrorException> {
    const data = await this.repository.retrieve({state: 1})
    return data
  }
  async update(param: RoomUpdate): Promise<Room | ErrorException> {
    //console.log("PARAM",param)
    const room = await this.repository.retrieve({identificador: param.identificador})
    if (room instanceof ErrorException) return room;
    const data = await this.repository.update({id: room[0].id, state:0})
    return data
  }
}

export const roomServiceInstance = new RoomService();