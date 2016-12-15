export default class CoreController {
    baseUrl: string = null;
    routing: any = null;

    constructor() {
        let self : any = this;
        this.setBaseUrl();
        this.routing = self.__proto__.__proto__.__routing__;
        delete self.__proto__.__proto__.__routing__;
    }

    private setBaseUrl() {
        throw new Error('Controller class need to be decorated with @BaseUrl');
    }
}
