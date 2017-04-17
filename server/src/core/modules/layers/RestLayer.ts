import {Request, Response, NextFunction} from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import MorganRequestLogger from '../MorganRequestLogger';
import CoreApplication from '../base/CoreApplication';
import ISettings from '../../interfaces/ISettings';
import IController from '../../interfaces/IController';
import IError from '../../interfaces/IError';
import IHashTable from '../../interfaces/IHashTable';

export default class RestLayer extends CoreApplication {

  private requestLogger: MorganRequestLogger = null;

  constructor (settings: ISettings, controllers: IHashTable<IController>) {
    super(settings, controllers);
    this.requestLogger = new MorganRequestLogger();
    this.app.use(this.requestLogger.extractMiddleware());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());

    this.controllers.forEach((controller: IController) => {
      controller.register(this.app);
    });

    this.app.use(this.unimplementedHandler);
    this.app.use(this.unhandledErrorHandler);
  }

  private unimplementedHandler (req: Request, res: Response, next: NextFunction) {
    let err: IError = new Error('Not implemented');
    err.status = 405;
    next(err);
  }

  private unhandledErrorHandler (err: IError, req: Request, res: Response, next: NextFunction) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message,
        stack: err.stack
      });
  }
}
