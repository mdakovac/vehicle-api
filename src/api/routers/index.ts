import { Router } from "express";
import authRouter from "./authRouter";
import vehicleRouter from "./vehicleRouter";

const router = Router();

router.use("/vehicle", vehicleRouter);
router.use("/auth", authRouter);

export default router;
