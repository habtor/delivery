import { Router } from "express";
import {
  postDriverController,
  patchDriverController,
  getDrivers,
} from "../controllers/driverController.js";

const driverRouter = Router();

driverRouter.post("/sign-up", postDriverController);
driverRouter.patch("/:id", patchDriverController);
driverRouter.get("/", getDrivers);

export default driverRouter;
