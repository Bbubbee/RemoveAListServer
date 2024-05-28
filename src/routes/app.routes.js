import {
  addNewUser,
  loginUser,
  updateUserName,
  updateUserPassword,
  resetUserPassword,
} from "../controllers/UserController";

import {
  addVehicle,
  getUserVehicles,
  getVehicle,
  deleteVehicle,
} from "../controllers/VehicleController";

const routes = (app) => {
  app.route("/v1/auth/register").post(addNewUser);

  app.route("/v1/auth/login").post(loginUser);

  app.route("/v1/password/:userId").put(updateUserPassword);

  app.route("/v1/user/:userId").put(updateUserName);

  app.route("/v1/vehicle/add").post(addVehicle);

  app.route("/v1/user/:userId/vehicles").get(getUserVehicles);

  app.route("/v1/vehicles/:vehicleId").get(getVehicle);

  app.route("/v1/vehicles/:vehicleId").delete(deleteVehicle);

  app.route("/v1/password/reset").post(resetUserPassword);
};

export default routes;
