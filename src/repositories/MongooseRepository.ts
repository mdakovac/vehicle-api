import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ILoggerService } from "../services/interfaces/ILoggerService";
import { TYPES } from "../types";
import { IRepository } from "./interfaces/IRepository";

@injectable()
export class MongooseRepository implements IRepository {
    private _logger: ILoggerService;

    constructor(@inject(TYPES.Logger) logger: ILoggerService) {
        this._logger = logger;
    }

    connect = async (): Promise<void> => {
        try {
            await mongoose.connect(
                "mongodb+srv://admin:admin@cluster0.d2xln.mongodb.net/vehicleDb?retryWrites=true&w=majority",
                { useNewUrlParser: true, useUnifiedTopology: true }
            );

            this._logger.info("Mongoose connected");
        } catch (err) {
            this._logger.error(err);
        }

        return;
    };
}
