import * as express from "express";
import {Request, Response, Application} from "express";
import * as session from "express-session";
import * as path from "path";
import * as compression from "compression";
import * as favicon from "serve-favicon";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import Settings from "../interfaces/Settings";
import MorganRequestLogger from '../modules/MorganRequestLogger';

class CoreApplication {

    private app: Application = null;
    private parameters = null;
    private requestLogger: MorganRequestLogger = null;

    constructor(settings: Settings) {
        this.app = express();
        this.parameters = settings.get();
        this.requestLogger = new MorganRequestLogger();
    }

    private injectMiddlware(middlware) {
        this.app.use(middlware);
    }

    public initialize() {
        // view engine setup
        this.app.set("views", this.parameters.view.path);
        this.app.set("view engine", this.parameters.view.engine);

        // uncomment after placing your favicon in /public
        // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
        this.injectMiddlware(this.requestLogger.middleware());
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

        this.app.use("/", (req: Request, res: Response) => {
            res.render("index", {
                title: "Express"
            });
        });

        this.app.use("/users", (req: Request, res: Response) => {
            res.send("respond with a resource");
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

export default CoreApplication;