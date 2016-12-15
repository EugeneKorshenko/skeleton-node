import * as express from "express";
import {Application} from "express";
import Middleware from "../../interfaces/Middleware";
import Settings from "../../interfaces/Settings";
import CoreController from "./CoreController";

export default class CoreApplication {
    protected app: Application = null;
    protected parameters = null;
    protected controllers : Array<CoreController> = [];

    constructor(settings: Settings) {
        this.app = express();
        this.parameters = settings.get();
    }

    protected injectMiddlware(mw: Middleware) {
        this.app.use(mw.extractMiddleware());
    }

    public attachController(controller: CoreController) {
        this.controllers.push(controller);
    }
}