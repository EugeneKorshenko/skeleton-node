import CoreServer from "./core/modules/CoreServer";
import Application from "./core/modules/Application";
import YamlSettings from "./core/modules/YamlSettings";
import IndexController from "./controllers/IndexController";

const settings: YamlSettings = new YamlSettings("./settings/settings.yml");
const application: Application = new Application(settings);
const server: CoreServer = new CoreServer(application, settings);

const ic : IndexController = new IndexController();

application.attachController(ic);

application.initialize();

server.start();
