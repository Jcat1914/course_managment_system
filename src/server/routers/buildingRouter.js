import { Router } from 'express';
import { BuildingController } from '../controllers/buildingController.js';
export function createBuildingRouter(buildingService) {
  const buildingRouter = Router();
  const buildingController = new BuildingController(buildingService);
  buildingRouter.get('/', buildingController.getBuildings);
  buildingRouter.post('/add', buildingController.createBuilding);
  buildingRouter.put('/:id', buildingController.updateBuilding);
  buildingRouter.post('/:id/add-room', buildingController.addBuildingRooms);
  buildingRouter.put('/:id', buildingController.deleteBuildingRooms);
  buildingRouter.delete('/:id', buildingController.deleteBuilding);
  return buildingRouter;
}
