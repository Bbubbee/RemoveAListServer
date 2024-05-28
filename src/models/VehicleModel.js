import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;

export const VehicleSchema = new Schema({
  vin: {
    type: String,
  },
  plateNumber: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  colour: {
    type: String,
  },
  state: {
    type: String,
  },
  engineNumber: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
