interface GetMethod {
    () : any;
}

interface Settings {
    get: GetMethod;
}

export default Settings;