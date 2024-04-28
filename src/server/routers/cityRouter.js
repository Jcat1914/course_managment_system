import { Router } from "express";
import { CityController } from '../controllers/cityController.js'

export const createCityRouter = ({ City, Country }) => {
  const cityRouter = Router();
  const cityController = new CityController({ City, Country });

  cityRouter.get("/", cityController.getCities)
  cityRouter.get("/city-country", cityController.getCitiesWithCountry);
  cityRouter.post("/add", cityController.addCity);

  return cityRouter
};

