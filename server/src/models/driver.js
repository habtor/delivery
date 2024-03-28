import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  available: { type: Boolean, default: false, required: true },
  deliveries: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }],
  },
  vehicle: {
    type: String,
    required: true,
    enum: ["Car", "Bike", "Motorcycle"],
    default: "Car",
  },
  role: {
    type: String,
    default: "driver",
    required: true,
  },
  ratings: {
    type: [{ type: Number, min: 1, max: 5 }],
  },
});

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
