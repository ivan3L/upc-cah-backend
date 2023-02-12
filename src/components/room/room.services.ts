import { CrudService } from '../../utils/database/crudService';
import { roomRepositoryInstance } from './room.db';
import { Room, RoomDto, RoomUpdate } from './room.model';

export class RoomService extends CrudService<Room, RoomDto, RoomUpdate> {

  constructor() {
    super(roomRepositoryInstance)
  }
}

export const roomServiceInstance = new RoomService();