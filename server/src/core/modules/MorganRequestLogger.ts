import RequestLogger from "../interfaces/RequestLogger";
import * as morgan from "morgan";

export default class MorganRequestLogger implements RequestLogger {
    constructor() {}

    middleware() {
        return morgan("combined");
    }
}