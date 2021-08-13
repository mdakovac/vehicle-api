import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ILoggerService } from "../../services/interfaces/ILoggerService";
import { toString, trim } from "lodash";
import { IAuthService } from "../../services/interfaces/IAuthService";
import { IUser } from "../../models/User";

@injectable()
export class AuthController {
    private _authService: IAuthService;
    private _logger: ILoggerService;

    constructor(
        @inject(TYPES.AuthService) authService: IAuthService,
        @inject(TYPES.Logger) logger: ILoggerService
    ) {
        this._authService = authService;
        this._logger = logger;
    }

    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const usernameString: string = trim(toString(username));
            const passwordString: string = trim(toString(password));

            const user: IUser = await this._authService.getByUsername(
                usernameString
            );
            if (!user) return res.status(400).end();

            const passwordMatch: boolean =
                await this._authService.checkPasswordMatch(
                    passwordString,
                    user.password
                );
            if (!passwordMatch) return res.status(400).end();

            const token: string = this._authService.getToken(
                user._id,
                user.username
            );
            if (!token) return res.status(400).end();

            return res.status(200).json({
                token: token,
            });
        } catch (error) {
            this._logger.error(error);
            return res.status(500).send(error.message);
        }
    };
}
