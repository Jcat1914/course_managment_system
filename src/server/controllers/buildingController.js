export class BuildingController {
  constructor(buildingService) {
    this.buildingService = buildingService;
  }

  getBuildings = async (req, res) => {
    try {
      const buildings = await this.buildingService.getBuildings();
      res.status(200).json(buildings);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  createBuilding = async (req, res) => {
    try {
      const building = await this.buildingService.createBuilding(req.body);
      res.status(201).json({ msg: 'Building created successfully', building })
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  updateBuilding = async (req, res) => {
    try {
      const building = await this.buildingService.updateBuilding(req.params.id, req.body);
      res.status(200).json({ msg: 'Building updated successfully', building })
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  deleteBuildingRooms = async (req, res) => {
    try {
      const building = await this.buildingService.deleteBuildingRooms(req.params.id, req.body);
      res.status(200).json({ msg: 'Rooms deleted successfully', building });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  deleteBuilding = async (req, res) => {
    try {
      await this.buildingService.deleteBuilding(req.params.id);
      res.status(202).json({ msg: 'Building deleted successfully' });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  addBuildingRooms = async (req, res) => {
    const { room } = req.body;
    try {
      const newRoom = await this.buildingService.addBuildingRooms(req.params.id, room);
      res.status(200).json({ msg: 'Rooms added successfully', newRoom });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }
}
