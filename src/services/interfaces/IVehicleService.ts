import { IVehicle } from "../../models/Vehicle";

export interface IVehicleService {
    find(query: string, rpp: number, page: number): Promise<IVehicle[]>;
    get(id: string): Promise<IVehicle>;
    delete(id: string): Promise<boolean>;
    create(make: string, model: string, year: number): Promise<IVehicle>;
    count(query: string): Promise<number>;
}
