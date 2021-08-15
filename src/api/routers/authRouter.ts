import { Router } from "express";
import { container } from "../../inversify.config";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();
const authController = container.get<AuthController>("AuthController");

authRouter.post("/login", authController.login);

export default authRouter;
