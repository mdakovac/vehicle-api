import { inject, injectable } from "inversify";
import { toNumber } from "lodash";
import { IVehicle, VehicleModel } from "../models/Vehicle";
import { IRepository } from "../repositories/interfaces/IRepository";
import { TYPES } from "../types";
import { IVehicleService } from "./interfaces/IVehicleService";

@injectable()
export class VehicleService implements IVehicleService {
    private _repository: IRepository;

    constructor(@inject(TYPES.Repository) repository: IRepository) {
        this._repository = repository;
    }

    find = async (
        query: string,
        rpp: number,
        page: number
    ): Promise<IVehicle[]> => {
        return this._repository.find<IVehicle>(
            VehicleModel,
            {
                $or: [
                    { make: { $regex: query, $options: "i" } },
                    { model: { $regex: query, $options: "i" } },
                    { year: toNumber(query) || undefined },
                ],
            },
            { make: 1, model: 1, year: 1 },
            page,
            rpp
        );
    };

    get = async (id: string): Promise<IVehicle> => {
        return this._repository.get<IVehicle>(VehicleModel, id);
    };

    delete = async (id: string): Promise<boolean> => {
        return this._repository.delete(VehicleModel, id);
    };

    create = async (
        make: string,
        model: string,
        year: number
    ): Promise<IVehicle> => {
        return this._repository.create<IVehicle>(
            VehicleModel,
            new VehicleModel({ make, model, year })
        );
    };

    count = async (query: string): Promise<number> => {
        return this._repository.count(VehicleModel, {
            $or: [
                { make: { $regex: query, $options: "i" } },
                { model: { $regex: query, $options: "i" } },
                { year: toNumber(query) || undefined },
            ],
        });
    };
}
