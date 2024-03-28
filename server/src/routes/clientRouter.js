import { Router } from "express";
import {
  postClientController,
  getClient,
} from "../controllers/clientController.js";

const clientRouter = Router();

clientRouter.post("/sign-up", postClientController);
clientRouter.get("/", getClient);

export default clientRouter;
