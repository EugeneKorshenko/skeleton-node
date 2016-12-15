import Methods from './CoreHttpMethods';

export function Sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function BaseUrl(url: string) {
    return (constructor: Function) => {
        constructor.prototype.setBaseUrl = function () {
            this.baseUrl = url;
        };
    };
}

export function Route(method: Methods, route: string) {
    return function (target: any, propertyKey: string) {
        target.__proto__.__routing__ = target.__proto__.__routing__ || [];
        target.__proto__.__routing__.push({
            action: propertyKey,
            method: method,
            route: route
        });
    };
}