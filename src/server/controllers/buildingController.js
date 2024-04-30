export class buildingController {
  constructor(buildingService) {
    this.buildingService = buildingService;
  }
  async getBuilding(req, res) {
    const building = await this.buildingService.getBuilding(req.params.id);
    res.json(building);
  }
}
