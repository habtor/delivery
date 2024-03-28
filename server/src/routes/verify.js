import { Router } from "express";
import fetch from "node-fetch";

const verifyRouter = Router();

verifyRouter.post("/", async (req, res) => {
  const VERIFY_ADDRESS_API_KEY = process.env.VERIFY_ADDRESS_API_KEY;
  const { zipcode, houseNumber } = req.body;

  try {
    const response = await fetch(
      `https://json.api-postcode.nl/?postcode=${zipcode}&number=${houseNumber}`,
      {
        headers: { token: VERIFY_ADDRESS_API_KEY },
      }
    );

    const data = await response.json();

    if (data.error) {
      res.status(400).json({ error: data.error });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default verifyRouter;
