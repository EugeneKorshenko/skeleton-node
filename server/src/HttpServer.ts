import * as http from 'http';
import {Application as ExpressApplication} from 'express';
import {EventEmitter} from 'events';
import ISettings from './core/interfaces/ISettings';
import IApplication from './core/interfaces/IApplication';

export default class HttpServer {

  private parameters = null;
  private serverInstance = null;

  constructor (application: IApplication, settings: ISettings) {
    const app: ExpressApplication = application.getExpressInstance();
    this.parameters = settings.get();
    this.serverInstance = http.createServer(app);
  }

  public start (): EventEmitter {
    return this.serverInstance
      .listen(this.parameters.server.port)
      .on('error', this.onError.bind(this))
      .on('listening', this.onListening.bind(this));
  }

  private onError (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof this.parameters.server.port === 'string'
      ? 'Pipe ' + this.parameters.server.port
      : 'Port ' + this.parameters.server.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private onListening () {
    const addr = this.serverInstance.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
}
