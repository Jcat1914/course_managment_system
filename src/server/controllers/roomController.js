export class RoomController {
  constructor(roomService) {
    this.roomService = roomService;
  }

  getRooms = async (req, res) => {
    try {
      const rooms = await this.roomService.getRooms();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  createRoom = async (req, res) => {
    try {
      const room = await this.roomService.createRoom(req.body);
      res.status(201).json({ msg: 'Rooms created successfully', room });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  updateRoom = async (req, res) => {
    try {
      const room = await this.roomService.updateRoom(req.params.id, req.body);
      res.status(200).json({ msg: 'Rooms updated successfully', room });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  deleteRoom = async (req, res) => {
    try {
      await this.roomService.deleteRoom(req.params.id);
      res.status(200).json({ msg: 'Rooms deleted successfully' });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }
}
