import HttpServer from './HttpServer';
import Application from './Application';
import YamlSettings from './core/modules/YamlSettings';
import controllers from './controllers';
import LayersCombiner from './core/LayersCombiner';
import RestLayer from './core/modules/layers/RestLayer';

/**
 * Load settings for the whole application
 * @type {YamlSettings}
 */
const settings: YamlSettings = new YamlSettings('./settings/settings.yml');

/**
 * Application Layers
 * @type {Application}
 */
const application: Application = new Application(settings, controllers);
const restLayer: RestLayer = new RestLayer(settings, controllers);

/**
 * Combine all layers into one application as the facade
 * for http server
 * @type {LayersCombiner}
 */
const layersCombiner: LayersCombiner = new LayersCombiner({
  '/v1/api': application,
  '/v2/api': restLayer
});

/**
 * Server to run combined layers
 * @type {HttpServer}
 */
const server: HttpServer = new HttpServer(layersCombiner, settings);

application.initialize();

server.start();
