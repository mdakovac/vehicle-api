import { Container } from "inversify";
import { AuthController } from "./api/controllers/AuthController";
import { VehicleController } from "./api/controllers/VehicleController";
import { IRepository } from "./repositories/interfaces/IRepository";
import { MongooseRepository } from "./repositories/MongooseRepository";
import { AuthService } from "./services/AuthService";
import { IAuthService } from "./services/interfaces/IAuthService";
import { ILoggerService } from "./services/interfaces/ILoggerService";
import { IVehicleService } from "./services/interfaces/IVehicleService";
import { SimpleLoggerService } from "./services/SimpleLoggerService";
import { VehicleService } from "./services/VehicleService";
import { TYPES } from "./types";

const container = new Container();

/* REPOSITORIES */
container.bind<IRepository>(TYPES.Repository).to(MongooseRepository);

/* SERVICES */
container.bind<ILoggerService>(TYPES.Logger).to(SimpleLoggerService);
container.bind<IVehicleService>(TYPES.VehicleService).to(VehicleService);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);

/* CONTROLLERS */
container.bind<VehicleController>("VehicleController").to(VehicleController);
container.bind<AuthController>("AuthController").to(AuthController);

export { container };
