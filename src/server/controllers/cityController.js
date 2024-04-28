
export class CityController {
  constructor({ City, Country }) {
    this.cityModel = City;
    this.countryModel = Country;
  }
  getCities = async (req, res) => {
    try {
      const cities = await this.cityModel.findAll();
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  getCitiesWithCountry = async (req, res) => {
    try {
      const cities = await this.cityModel.findAll({
        include: {
          model: this.countryModel,
          attributes: ["id", "name"]
        }
      })
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  addCity = async (req, res) => {
    const { name, country } = req.body;
    try {
      const [con, created] = await this.countryModel.findOrCreate({ attributes: ['id'], where: { name: country } })
      const { id } = con

      if (created) console.log('Country created')
      const city = await this.cityModel.create({
        name: name,
        countryId: id
      })
      res.status(201).json(city);
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
}

