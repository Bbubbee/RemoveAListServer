import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  email: {
    type: String,
    required: "Enter a email",
    unique: true,
  },
  name: {
    type: String,
    required: "Enter a name",
  },
  password: {
    type: String,
    required: "Enter a password",
  },
  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
});
