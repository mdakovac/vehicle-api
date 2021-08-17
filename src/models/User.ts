import { model, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    _id: string;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const UserModel = model<IUser>("User", UserSchema, "Users");
