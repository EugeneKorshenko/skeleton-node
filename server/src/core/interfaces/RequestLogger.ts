interface Middleware {
    () : any;
}

interface RequestLogger {
    extractMiddleware: Middleware;
}

export default RequestLogger;