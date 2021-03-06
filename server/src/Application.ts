import {Request, Response, NextFunction} from 'express';
import * as session from 'express-session';
import * as path from 'path';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import MorganRequestLogger from './core/modules/MorganRequestLogger';
import CoreApplication from './core/modules/base/CoreApplication';
import ISettings from './core/interfaces/ISettings';
import IController from './core/interfaces/IController';
import IError from './core/interfaces/IError';
import IErrorHandler from './core/interfaces/IErrorHandler';
import IHashTable from './core/interfaces/IHashTable';

export default class Application extends CoreApplication {

  private requestLogger: MorganRequestLogger = null;

  constructor (settings: ISettings, controllers: IHashTable<IController>) {
    super(settings, controllers);
    this.requestLogger = new MorganRequestLogger();
  }

  public initialize () {
    this.app.set('views', path.join(__dirname, this.parameters.view.path));
    this.app.set('view engine', this.parameters.view.engine);
    this.injectMiddleware(this.requestLogger);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.set('trust proxy', 1); // trust first proxy
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

    this.controllers.forEach((controller: IController) => {
      controller.register(this.app);
    });

    // catch 404 and forward to error handler
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      let err: IError = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    let errorHandler: IErrorHandler = function (err: IError, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      return res.render('error');
    };

    this.app.use(errorHandler);
  }
}
