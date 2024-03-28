import Delivery from "../models/delivery.js";
import Client from "../models/client.js";
import Driver from "../models/driver.js";

export const getDeliveries = async (req, res) => {
  const { client } = req.query;
  const { pending } = req.query;
  const { deliveryId } = req.query;
  const { driver } = req.query;
  const { status } = req.query;

  if (driver && status) {
    try {
      const deliveries = await Delivery.find({ driver, status });
      for (let delivery of deliveries) {
        const client = await Client.findById(delivery.client);
        delivery.client = client;
      }
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    return;
  }
  if (driver) {
    try {
      const deliveries = await Delivery.find({ driver });
      for (let delivery of deliveries) {
        const client = await Client.findById(delivery.client);
        delivery.client = client;
      }
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    return;
  }

  if (deliveryId) {
    try {
      const delivery = await Delivery.findById(deliveryId);
      res.status(200).json(delivery);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    return;
  }
  if (client && pending) {
    try {
      const deliveries = await Delivery.find({ client, status: "Pending" });
      for (let delivery of deliveries) {
        const driver = await Driver.findById(delivery.driver);
        delivery.driver = driver;
      }
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    return;
  }
  if (client) {
    try {
      const deliveries = await Delivery.find({ client });
      for (let delivery of deliveries) {
        const driver = await Driver.findById(delivery.driver);
        delivery.driver = driver;
      }
      res.status(200).json(deliveries);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    return;
  }
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDelivery = async (req, res) => {
  const { client, pickup, dropoff, cost, weight, distance, description } =
    req.body;
  const clientExists = await Client.findById(client);

  const newDelivery = new Delivery({
    client,
    pickup,
    dropoff,
    cost,
    weight,
    distance,
    description,
  });
  try {
    const delivery = await newDelivery.save();
    clientExists.deliveries.push(delivery._id);
    await clientExists.save();
    res.status(201).json(delivery);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const patchDelivery = async (req, res) => {
  const { id } = req.query;
  const { driver } = req.body;
  const { status } = req.body;
  const { rating } = req.query;

  if (rating) {
    try {
      const delivery = await Delivery.findById(id);
      delivery.rated = true;
      delivery.rating = rating;
      await delivery.save();
      const driver = await Driver.findById(delivery.driver);
      driver.ratings.push(rating);
      await driver.save();
      return res.status(200).json(delivery);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  if (
    status === "Accepted" ||
    status === "Rejected" ||
    status === "Delivered"
  ) {
    try {
      const delivery = await Delivery.findById(id);
      delivery.status = status;
      await delivery.save();
      res.status(200).json(delivery);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    return;
  }

  if (typeof driver !== "string")
    return res.status(400).json({ message: "Driver must be a string (id)!" });
  try {
    const delivery = await Delivery.findById(id);
    delivery.driver = driver;
    delivery.status = "Pending";
    await delivery.save();
    const foundDriver = await Driver.findById(driver);
    if (foundDriver) {
      foundDriver.deliveries.push(delivery._id);
      await foundDriver.save();
    }
    res.status(200).json(delivery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
