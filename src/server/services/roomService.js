export class RoomService {
  constructor(roomModel) {
    this.roomModel = roomModel;
  }

  getRooms = async () => {
    try {
      const rooms = await this.roomModel.findAll({ attributes: ["id", "roomCode", "capacity", "status", "buildingId"] });
      return rooms;
    } catch (error) {
      throw new Error("Could not get rooms");
    }
  }

  createRoom = async (room) => {
    try {
      const newRoom = await this.roomModel.create(room);
      return newRoom;
    } catch (error) {
      throw new Error("Could not create room");
    }
  }

  updateRoom = async (id, room) => {
    try {
      await this.roomModel.update(room, { where: { id } });
      const updatedRoom = await this.roomModel.findByPk(id);
      return updatedRoom;
    } catch (error) {
      throw new Error("Could not update room");
    }
  }

  deleteRoom = async (id) => {
    try {
      const room = await this.roomModel.findByPk(id);
      if (!room) {
        throw new Error("Room not found");
      }
      await room.destroy();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
