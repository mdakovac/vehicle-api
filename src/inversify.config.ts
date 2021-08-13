import { Container } from "inversify";
import { VehicleController } from "./api/controllers/VehicleController";
import { IRepository } from "./repositories/interfaces/IRepository";
import { MongooseRepository } from "./repositories/MongooseRepository";
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

/* CONTROLLERS */
container.bind<VehicleController>("VehicleController").to(VehicleController);

export { container };
