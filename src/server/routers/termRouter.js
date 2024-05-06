import { Router } from "express";
import { TermController } from "../controllers/termController.js";
export const createTermRouter = (termService) => {
  const termRouter = Router();
  const termController = new TermController(termService);
  termRouter.get("/", termController.getTerms);
  termRouter.get("/:id", termController.getTermById);
  termRouter.post("/add", termController.createTerm);
  termRouter.put('/:id', termController.updateTerm);

  return termRouter;
};
