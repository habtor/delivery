import Client from "../models/client.js";
import Driver from "../models/driver.js";
import { comparePassword } from "../util/hashing.js";

import jwt from "jsonwebtoken";

export const signinController = async (req, res) => {
  try {
    const { email, password, isClient } = req.body;
    if (isClient) {
      const foundClient = await Client.findOne({ email });
      if (!foundClient) {
        return res.status(404).json({ message: "Email not found" });
      }
      const isMatch = await comparePassword(password, foundClient.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = jwt.sign({ id: foundClient._id }, process.env.JWT_SECRET);
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ message: "Logged in" });
    }

    const foundDriver = await Driver.findOne({ email });
    if (!foundDriver) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isMatch = await comparePassword(password, foundDriver.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: foundDriver._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Logged in" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundClient = await Client.findById(decoded.id);
    const foundDriver = await Driver.findById(decoded.id);
    if (foundClient) {
      return res.status(200).json(foundClient);
    }
    if (foundDriver) {
      return res.status(200).json(foundDriver);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
