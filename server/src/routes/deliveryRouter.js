import { Router } from "express";
import {
  getDeliveries,
  createDelivery,
  patchDelivery,
} from "../controllers/deliveryController.js";

const deliveryRouter = Router();

deliveryRouter.get("/", getDeliveries);

deliveryRouter.post("/", createDelivery);
deliveryRouter.patch("/", patchDelivery);

export default deliveryRouter;
