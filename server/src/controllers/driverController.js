import Driver from "../models/driver.js";
import { hashPassword } from "../util/hashing.js";

export const getDrivers = async (req, res) => {
  const { city } = req.query;
  const { id } = req.query;
  if (city) {
    try {
      const drivers = await Driver.find({ city, available: true });
      res.status(200).json({ drivers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    return;
  }

  if (id) {
    try {
      const driver = await Driver.findById(id);
      res.status(200).json(driver);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    return;
  }

  try {
    const drivers = await Driver.find();
    res.status(200).json({ drivers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postDriverController = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, city, vehicle } =
      req.body;

    const emailExists = await Driver.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newDriver = new Driver({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      city,
      vehicle,
    });
    await newDriver.save();
    res.status(201).json({ driver: newDriver, message: "Driver created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const patchDriverController = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const driver = await Driver.findById(id);
      if (driver.available) {
        driver.available = false;
        await driver.save();
        return res.status(200).json({ message: "Driver is not available" });
      }
      driver.available = true;
      await driver.save();
      res.status(200).json({ message: "Driver is available" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
