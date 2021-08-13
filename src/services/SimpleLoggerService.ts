import { injectable } from "inversify";
import { ILoggerService } from "./interfaces/ILoggerService";
const log = require("simple-node-logger").createSimpleLogger();

// https://github.com/darrylwest/simple-node-logger
@injectable()
export class SimpleLoggerService implements ILoggerService {
    private _logger = log;

    setLevel(level: string): void {
        this._logger.setLevel(level);
    }

    info(message: string): void {
        this._logger.info(message);
    }

    error(message: string): void {
        this._logger.error(message);
    }
}
