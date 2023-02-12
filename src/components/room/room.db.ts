import { CrudRepository } from "../../utils/database/crudRepository";
import { Room, RoomDto, RoomUpdate } from "./room.model";

export class RoomRepository extends CrudRepository<Room, RoomDto, RoomUpdate> {

  constructor() {
      super("room");
  }

}

export const roomRepositoryInstance = new RoomRepository();