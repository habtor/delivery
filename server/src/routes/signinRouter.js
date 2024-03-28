import {
  signinController,
  getProfileController,
} from "../controllers/signinController.js";
import { Router } from "express";

const signinRouter = Router();

signinRouter.post("/", signinController);
signinRouter.get("/profile", getProfileController);

export default signinRouter;
