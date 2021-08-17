import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IVehicleService } from "../../services/interfaces/IVehicleService";
import { ILoggerService } from "../../services/interfaces/ILoggerService";
import { toNumber, toString } from "lodash";
import { IVehicle } from "../../models/Vehicle";

@injectable()
export class VehicleController {
    private _vehicleService: IVehicleService;
    private _logger: ILoggerService;

    constructor(
        @inject(TYPES.VehicleService) vehicleService: IVehicleService,
        @inject(TYPES.Logger) logger: ILoggerService
    ) {
        this._vehicleService = vehicleService;
        this._logger = logger;
    }

    find = async (req: Request, res: Response) => {
        try {
            const { query = "", page = 1, rpp = 10 } = req.query;
            const queryString: string = toString(query);
            const pageNumber: number = toNumber(page);
            const rppNumber: number = toNumber(rpp);

            const [result, count] = await Promise.all([
                this._vehicleService.find(queryString, rppNumber, pageNumber),
                this._vehicleService.count(queryString),
            ]);

            return res.status(200).json({
                total: count,
                items: result,
                page: pageNumber,
                rpp: rppNumber,
                query: query,
            });
        } catch (error) {
            this._logger.error(error);
            return res.status(500).send(error.message);
        }
    };

    get = async (req: Request, res: Response) => {
        try {
            const { id = "" } = req.params;
            const idString: string = toString(id);

            const result: IVehicle = await this._vehicleService.get(idString);
            if (!result) {
                return res.status(404).send();
            }

            return res.status(200).json(result);
        } catch (error) {
            this._logger.error(error);
            return res.status(500).send(error.message);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const { make, model, year } = req.body;
            const makeString: string = toString(make);
            const modelString: string = toString(model);
            const yearNumber: number = toNumber(year);

            const result: IVehicle = await this._vehicleService.create(
                makeString,
                modelString,
                yearNumber
            );

            return res.status(200).json(result);
        } catch (error) {
            if (error.code === 11000)
                return res
                    .status(400)
                    .send({ code: 11000, messsage: "Already exists!" });

            this._logger.error(error);
            return res.status(500).send(error.message);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const idString: string = toString(id);

            const vehicle: IVehicle = await this._vehicleService.get(idString);
            if (!vehicle) {
                return res.status(404).send();
            }

            const result: boolean = await this._vehicleService.delete(idString);
            if (!result) {
                return res.status(500).send();
            }

            return res.status(204).json();
        } catch (error) {
            this._logger.error(error);
            return res.status(500).send(error.message);
        }
    };
}
