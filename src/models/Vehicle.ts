import { model as mmodel, Schema } from "mongoose";

export interface IVehicle extends Document {
    make: string;
    model: string;
    year: number;
}

const VehicleSchema: Schema = new Schema({
    make: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    model: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    year: {
        type: Number,
        required: true,
        max: 2030,
    },
});

VehicleSchema.index({ make: 1, model: 1, year: 1 }, { unique: true });

export const VehicleModel = mmodel<IVehicle>(
    "Vehicle",
    VehicleSchema,
    "VehicleTypes"
);
