import "reflect-metadata";
import express from "express";
import { json } from "body-parser";
import { container } from "./inversify.config";
import { IRepository } from "./repositories/interfaces/IRepository";
import { ILoggerService } from "./services/interfaces/ILoggerService";
import { TYPES } from "./types";

const repository = container.get<IRepository>(TYPES.Repository);
repository.connect();

const logger = container.get<ILoggerService>(TYPES.Logger);
const app = express();
app.use(json());

app.listen(3000, () => logger.info("Server listening on port 3000"));
