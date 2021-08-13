import { inject, injectable } from "inversify";
import { ILoggerService } from "../services/interfaces/ILoggerService";
import { TYPES } from "../types";
import { IRepository } from "./interfaces/IRepository";
import mongoose from "mongoose";

@injectable()
export class MongooseRepository implements IRepository {
    private _logger: ILoggerService;

    constructor(@inject(TYPES.Logger) logger: ILoggerService) {
        this._logger = logger;
    }

    connect = async (): Promise<void> => {
        try {
            await mongoose.connect(
                "mongodb+srv://admin:admin@cluster0.d2xln.mongodb.net/VehicleDb?retryWrites=true&w=majority",
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                }
            );

            this._logger.info("Mongoose connected");
        } catch (err) {
            this._logger.error(err);
        }

        return;
    };

    find = async <T>(
        model: mongoose.Model<any>,
        findParams: any,
        sortParams: any,
        page: number = 1,
        rpp: number = 10
    ): Promise<T[]> => {
        return model
            .find(findParams)
            .sort(sortParams)
            .skip((page - 1) * page)
            .limit(rpp);
    };

    findOne = async <T>(
        model: mongoose.Model<any>,
        findParams: any
    ): Promise<T> => {
        return model.findOne(findParams);
    };

    get = async <T>(model: mongoose.Model<any>, id: string): Promise<T> => {
        return model.findById(mongoose.Types.ObjectId(id));
    };

    create = async <T>(model: mongoose.Model<any>, document: T): Promise<T> => {
        return model.create(document);
    };

    delete = async (
        model: mongoose.Model<any>,
        id: string
    ): Promise<boolean> => {
        const result = await model.deleteOne({
            _id: mongoose.Types.ObjectId(id),
        });

        return result.deletedCount! > 0;
    };

    count = async (
        model: mongoose.Model<any>,
        findParams: any
    ): Promise<number> => {
        return model.countDocuments(findParams);
    };
}
