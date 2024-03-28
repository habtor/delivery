import Client from "../models/client.js";
import { hashPassword } from "../util/hashing.js";

export const postClientController = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, city } = req.body;

    const emailExists = await Client.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newClient = new Client({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      city,
    });
    await newClient.save();
    res.status(201).json({ client: newClient, message: "Client created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClient = async (req, res) => {
  const { id } = req.query;

  if (id) {
    try {
      const client = await Client.findById(id);
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    return;
  }

  try {
    const clients = await Client.find();
    res.status(200).json({ clients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
