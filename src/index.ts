import "reflect-metadata";
import express from "express";
import { container } from "./inversify.config";
import { IRepository } from "./repositories/interfaces/IRepository";
import { ILoggerService } from "./services/interfaces/ILoggerService";
import { TYPES } from "./types";
import router from "./api/routers";
import cors from "cors";

const repository = container.get<IRepository>(TYPES.Repository);
repository.connect();

const logger = container.get<ILoggerService>(TYPES.Logger);
const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
    })
);
app.use(express.json());
app.use(router);

app.listen(3000, () => logger.info("Server listening on port 3000"));
