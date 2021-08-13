import { Router } from "express";
import { container } from "../../inversify.config";
import { VehicleController } from "../controllers/VehicleController";

const vehicleRouter = Router();
const vehicleController = container.get<VehicleController>("VehicleController");

vehicleRouter.get("", vehicleController.find);
vehicleRouter.get("/:id", vehicleController.get);
vehicleRouter.post("/", vehicleController.create);
vehicleRouter.delete("/:id", vehicleController.delete);

export default vehicleRouter;
