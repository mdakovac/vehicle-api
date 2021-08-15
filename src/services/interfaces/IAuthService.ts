import { IUser } from "../../models/User";
import jwt from "jsonwebtoken";

export interface IAuthService {
    getByUsername(username: string): Promise<IUser>;
    checkPasswordMatch(
        password: string,
        passwordHash: string
    ): Promise<boolean>;
    getToken(userId: string, username: string): string;
    verifyToken(token: string): string | jwt.JwtPayload;
}
