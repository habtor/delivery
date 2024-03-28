import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  deliveries: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }],
  },
  role: { type: String, default: "client", required: true },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
