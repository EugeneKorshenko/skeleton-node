import * as express from 'express';
import {Application as ExpressApplication} from 'express';
import IMiddleware from '../../interfaces/IMiddleware';
import ISettings from '../../interfaces/ISettings';
import IHashTable from '../../interfaces/IHashTable';
import IController from '../../interfaces/IController';
import IApplication from '../../interfaces/IApplication';

export default class CoreApplication implements IApplication {
  protected app: ExpressApplication = null;
  protected parameters = null;
  protected controllers: Array<IController> = [];

  constructor (settings: ISettings, controllers: IHashTable<IController>) {
    this.app = express();
    this.parameters = settings.get();

    Object.keys(controllers).forEach((key: string) => {
      this.attachController(controllers[key]);
    });
  }

  /**
   * Retrieve instantiated express application
   * @return {ExpressApplication}
   */
  public getExpressInstance (): ExpressApplication {
    return this.app;
  }

  protected injectMiddleware (mw: IMiddleware) {
    this.app.use(mw.extractMiddleware());
  }

  private attachController (controller: IController) {
    this.controllers.push(controller);
  }
}
