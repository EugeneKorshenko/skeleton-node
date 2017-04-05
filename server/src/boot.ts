import HttpServer from './HttpServer';
import Application from './Application';
import YamlSettings from './core/modules/YamlSettings';
import controllers from './controllers';

const settings: YamlSettings = new YamlSettings('./settings/settings.yml');
const application: Application = new Application(settings, controllers);
const server: HttpServer = new HttpServer(application, settings);

application.initialize();

server.start();
