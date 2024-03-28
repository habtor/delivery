import { Router } from "express";

const signoutRouter = Router();

signoutRouter.get("/", (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { maxAge: 1 })
      .json({ message: "Signed out" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default signoutRouter;
