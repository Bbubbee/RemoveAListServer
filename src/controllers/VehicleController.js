import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import { VehicleSchema } from "../models/VehicleModel";
import { UserSchema } from "../models/UserModel";

const User = mongoose.model("User", UserSchema);
const Vehicle = mongoose.model("Vehicle", VehicleSchema);

export const addVehicle = async (req, res) => {
  const {
    vin,
    plateNumber,
    make,
    model,
    vehicleType,
    colour,
    state,
    engineNumber,
    userId,
  } = req.body;

  console.log(state);

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // TODO: Check if vehicle exists in database by checking for vin.

    // Create a new vehicle object.
    const newVehicle = new Vehicle({
      vin,
      plateNumber,
      make,
      model,
      vehicleType,
      colour,
      state,
      engineNumber,
      userId,
    });

    const savedVehicle = await newVehicle.save();

    // Add the vehicle to the user's vehicles array.
    user.vehicles.push(savedVehicle._id);
    await user.save();

    res.status(201).json({ vehicle: savedVehicle });

    // I don't know what this does.
    // res.json({ user: savedUser });
  } catch (error) {
    console.error("Error adding new vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserVehicles = async (req, res) => {
  const { userId } = req.params;
  console.log(`Getting vehicles for user: ${userId}`);

  try {
    const user = await User.findById(userId).populate("vehicles");
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("User found:", user);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user with vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicle = async (req, res) => {
  const { vehicleId } = req.params;

  console.log("Trying to get vehicle", vehicleId);

  try {
    // Check if the vehicle exists.
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // console.log("found vehicle: ", vehicle);
    res.json({ vehicle: vehicle });
  } catch (error) {
    console.error("Error getting vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVehicle = async (req, res) => {
  const { vehicleId } = req.params;

  try {
    // Find the vehicle by ID.
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Find the user that has the vehicle.
    const user = await User.findById(vehicle.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete vehicle from user's vehicles array.
    user.vehicles = user.vehicles.filter((v) => v.toString() !== vehicleId);
    await user.save();

    // Delete the vehicle from database.
    await Vehicle.findByIdAndDelete(vehicleId);

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
