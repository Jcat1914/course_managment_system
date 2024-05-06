export class BuildingService {
  constructor(buildingModel) {
    this.buildingModel = buildingModel;
  }

  getBuildings = async () => {
    try {
      const buildings = await this.buildingModel.findAll({
        include: 'rooms',
      })
      if (!buildings) {
        throw new Error("No buildings found")
      }
      return buildings
    } catch (error) {
      throw new Error(error.message)
    }
  }

  deleteBuilding = async (id) => {
    try {
      const building = await this.buildingModel.findByPk(id);
      if (!building) {
        throw new Error("Building not found");
      }
      await building.destroy();
    } catch (error) {
      throw new Error(error.message);
    }
  }


  createBuilding = async (building) => {
    try {
      const newBuilding = await this.buildingModel.create(building);
      return newBuilding;
    } catch (error) {
      throw new Error("Could not create building");
    }
  }

  updateBuilding = async (id, building) => {
    try {
      await this.buildingModel.update(building, { where: { id } });
      const updatedBuilding = await this.buildingModel.findByPk(id);
      if (!updatedBuilding) {
        throw new Error("Building not found");
      }
      await updatedBuilding.reload({ include: 'rooms' });
      return updatedBuilding;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteBuildingRooms = async (id, rooms) => {
    try {
      const building = await this.buildingModel.findByPk(id);
      if (!building) {
        throw new Error("Building not found");
      }
      await building.removeRooms(rooms);
      await building.reload({ include: 'rooms' })
      return building;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  addBuildingRooms = async (id, room) => {
    try {
      const building = await this.buildingModel.findByPk(id);
      if (!building) {
        throw new Error("Building not found");
      }
      const newRoom = await building.createRoom(room);

      return newRoom;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
