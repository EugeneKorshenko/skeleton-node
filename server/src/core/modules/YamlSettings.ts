import * as fs from "fs";
import * as yaml from "js-yaml";
import Settings from "../interfaces/Settings";
import CoreSettings from "./base/CoreSettings";

export default class YamlSettings extends CoreSettings implements Settings {

    constructor(source: string) {
        super();
        const raw = fs.readFileSync(source, "UTF8");
        this.settingsData = yaml.safeLoad(raw);
    }
}
