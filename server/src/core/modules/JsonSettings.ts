import * as fs from "fs";
import Settings from "../interfaces/Settings";
import CoreSettings from "./base/CoreSettings";

export default class JsonSettings extends CoreSettings implements Settings {

    constructor(source: string) {
        super();
        const raw = fs.readFileSync(source, "UTF8");
        this.settingsData = JSON.parse(raw);
    }
}
