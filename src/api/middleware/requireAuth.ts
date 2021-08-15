import { Request, Response, NextFunction } from "express";
import { isString, replace } from "lodash";
import { container } from "../../inversify.config";
import { IAuthService } from "../../services/interfaces/IAuthService";
import { TYPES } from "../../types";

const authService = container.get<IAuthService>(TYPES.AuthService);

const respondUnauthorized = (res: Response): Response => {
    return res.status(401).send();
};

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    try {
        const token: string = req.headers.authorization || "";
        if (!token || !isString(token)) return respondUnauthorized(res);

        const jwt = replace(token, "Bearer ", "");

        authService.verifyToken(jwt); // throws error if invalid
    } catch (err) {
        return respondUnauthorized(res);
    }

    return next();
};
