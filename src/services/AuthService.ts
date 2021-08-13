import { inject, injectable } from "inversify";
import { IUser, UserModel } from "../models/User";
import { IRepository } from "../repositories/interfaces/IRepository";
import { TYPES } from "../types";
import { IAuthService } from "./interfaces/IAuthService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export class AuthService implements IAuthService {
    private _repository: IRepository;
    private _jwtKey: string = "fd52dba7-8f60-4012-821a-8547316e3b19";

    constructor(@inject(TYPES.Repository) repository: IRepository) {
        this._repository = repository;
    }

    getByUsername = async (username: string): Promise<IUser> => {
        return this._repository.findOne(UserModel, { username: username });
    };

    checkPasswordMatch = async (
        password: string,
        passwordHash: string
    ): Promise<boolean> => {
        return bcrypt.compare(password, passwordHash);
    };

    getToken = (userId: string, username: string): string => {
        return jwt.sign(
            {
                id: userId,
                username: username,
            },
            this._jwtKey
        );
    };
}
