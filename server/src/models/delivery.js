import mongoose from "mongoose";

const adressSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
  zipcode: { type: String, required: true },
});

const deliverySchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  pickup: { type: adressSchema, required: true },
  dropoff: { type: adressSchema, required: true },
  rated: { type: Boolean, required: true, default: false },
  rating: { type: Number, required: false },
  cost: { type: Number, required: true },
  weight: { type: String, required: true, enum: ["Small", "Medium", "Big"] },
  distance: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Accepted", "Delivered", "Rejected"],
    default: "Pending",
  },
  description: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
