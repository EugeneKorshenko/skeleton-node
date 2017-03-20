import * as express from 'express';
import {Application} from 'express';
import CoreController from './CoreController';
import IMiddleware from '../../interfaces/IMiddleware';
import ISettings from '../../interfaces/ISettings';
import IHashTable from '../../interfaces/IHashTable';

export default class CoreApplication {
  protected app: Application = null;
  protected parameters = null;
  protected controllers: Array<CoreController> = [];

  constructor (settings: ISettings, controllers: IHashTable<CoreController>) {
    this.app = express();
    this.parameters = settings.get();

    Object.keys(controllers).forEach((key: string) => {
      this.attachController(controllers[key]);
    });
  }

  protected injectMiddlware (mw: IMiddleware) {
    this.app.use(mw.extractMiddleware());
  }

  private attachController (controller: CoreController) {
    this.controllers.push(controller);
  }
}
