import { Router } from "express";
import vehicleRouter from "./VehicleRouter";

const router = Router();

router.use("/vehicles", vehicleRouter);

export default router;
