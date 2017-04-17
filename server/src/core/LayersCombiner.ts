import * as express from 'express';
import {Express as ExpressApplication} from 'express';
import IHashTable from './interfaces/IHashTable';
import IApplication from './interfaces/IApplication';

export default class LayersCombiner implements IApplication {

  private combinerApp: ExpressApplication = null;

  constructor (layers: IHashTable<IApplication>) {
    this.combinerApp = express();

    Object.keys(layers).forEach((key: string) => {
      let layer: IApplication = layers[key];
      this.combinerApp.use(key, layer.getExpressInstance());
    });
  }

  /**
   * Retrieve instantiated express application
   * @return {ExpressApplication}
   */
  public getExpressInstance (): ExpressApplication {
    return this.combinerApp;
  }
}
