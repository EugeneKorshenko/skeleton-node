import CoreHttpServer from './core/modules/CoreHttpServer';
import Application from './core/modules/Application';
import YamlSettings from './core/modules/YamlSettings';
import controllers from './controllers';

const settings: YamlSettings = new YamlSettings('./settings/settings.yml');
const application: Application = new Application(settings, controllers);
const server: CoreHttpServer = new CoreHttpServer(application, settings);

application.initialize();

server.start();
