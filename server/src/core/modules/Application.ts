import * as express from "express";
import {Request, Response, Router} from "express";
import * as session from "express-session";
import * as path from "path";
import * as compression from "compression";
import * as favicon from "serve-favicon";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import Settings from "../interfaces/Settings";
import MorganRequestLogger from "../modules/MorganRequestLogger";
import CoreApplication from "./base/CoreApplication";
import Methods from './base/CoreHttpMethods';

export default class Application extends CoreApplication {

    private requestLogger: MorganRequestLogger = null;

    constructor(settings: Settings) {
        super(settings);
        this.requestLogger = new MorganRequestLogger();
    }

    public initialize() {
        // view engine setup
        this.app.set("views", this.parameters.view.path);
        this.app.set("view engine", this.parameters.view.engine);

        // uncomment after placing your favicon in /public
        // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
        this.injectMiddlware(this.requestLogger);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(helmet());
        this.app.set("trust proxy", 1); // trust first proxy
        this.app.use(session({
            secret: this.parameters.session.secret,
            name: this.parameters.session.key_name,
            resave: this.parameters.session.resave,
            saveUninitialized: this.parameters.session.save_uninitialized,
            cookie: {
                secure: this.parameters.session.secure_cookie
            }
        }));
        this.app.use(compression());
        this.app.use(express.static(path.join(__dirname, "public")));

        //@todo: Need to be improved!
        this.controllers.forEach((controller) => {
            let router: Router = Router();
            controller.routing.forEach((route) => {
                let method = null;

                switch (route.method) {
                    case Methods.GET:
                        method = 'get'; break;
                    case Methods.POST:
                        method = 'post'; break;
                    case Methods.PUT:
                        method = 'put'; break;
                    case Methods.DELETE:
                        method = 'delete'; break;
                    default:
                        throw new Error('Method not allowed: ' + route.method);
                }

               router[method](route.route, controller[route.action]);
            });
            this.app.use(controller.baseUrl, router);
        });

        // catch 404 and forward to error handler
        this.app.use(function(req: Request, res: Response, next: any) {
            let err: any = new Error("Not Found");
            err.status = 404;
            next(err);
        });

        // error handler
        this.app.use(function(err: any, req: Request, res: Response, next: any) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            return res.render("error");
        });
    }



    public getExpressInstance() {
        return this.app;
    }

}
