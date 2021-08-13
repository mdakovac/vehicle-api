import { IUser } from "../../models/User";

export interface IAuthService {
    getByUsername(username: string): Promise<IUser>;
    checkPasswordMatch(
        password: string,
        passwordHash: string
    ): Promise<boolean>;
    getToken(userId: string, username: string): string;
}
