import Settings from "../../interfaces/Settings";

/**
 * Virtual class
 */

abstract class CoreSettings implements Settings {

    protected settingsData: any = null;

    constructor() {}

    public get() {
        return this.settingsData;
    }
}

export default CoreSettings;