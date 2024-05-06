import { Router } from 'express';
import { RoomController } from '../controllers/roomController.js';

export function createRoomRouter(roomService) {
  const roomRouter = Router();
  const roomController = new RoomController(roomService);
  roomRouter.get('/', roomController.getRooms);
  roomRouter.post('/add', roomController.createRoom);
  roomRouter.put('/:id', roomController.updateRoom);
  roomRouter.delete('/:id', roomController.deleteRoom);
  return roomRouter;
}
