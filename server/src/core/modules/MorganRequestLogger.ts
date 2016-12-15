import RequestLogger from "../interfaces/RequestLogger";
import * as morgan from "morgan";
import Middleware from "../interfaces/Middleware";

export default class MorganRequestLogger implements RequestLogger, Middleware {
    constructor() {}

    extractMiddleware() {
        return morgan("dev");
    }
}