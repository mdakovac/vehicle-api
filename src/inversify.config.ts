import { Container } from "inversify";
import { IRepository } from "./repositories/interfaces/IRepository";
import { MongooseRepository } from "./repositories/MongooseRepository";
import { ILoggerService } from "./services/interfaces/ILoggerService";
import { SimpleLoggerService } from "./services/SimpleLoggerService";
import { TYPES } from "./types";

const container = new Container();

/* REPOSITORIES */
container.bind<IRepository>(TYPES.Repository).to(MongooseRepository);

/* SERVICES */
container.bind<ILoggerService>(TYPES.Logger).to(SimpleLoggerService);

export { container };
