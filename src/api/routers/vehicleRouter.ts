import { Router } from "express";
import { container } from "../../inversify.config";
import { VehicleController } from "../controllers/VehicleController";
import { requireAuth } from "../middleware/requireAuth";

const vehicleRouter = Router();
const vehicleController = container.get<VehicleController>("VehicleController");

vehicleRouter.get("", requireAuth, vehicleController.find);
vehicleRouter.get("/:id", requireAuth, vehicleController.get);
vehicleRouter.post("/", requireAuth, vehicleController.create);
vehicleRouter.delete("/:id", requireAuth, vehicleController.delete);

export default vehicleRouter;
