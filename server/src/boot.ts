import CoreServer from './core/modules/CoreServer';
import CoreApplication from './core/modules/CoreApplication';
import YamlSettings from './core/modules/YamlSettings';

const settings: YamlSettings = new YamlSettings('./settings/settings.yml');
const application: CoreApplication = new CoreApplication(settings);
const server: CoreServer = new CoreServer(application, settings);

application.initialize();
server.start();
