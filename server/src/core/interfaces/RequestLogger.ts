interface middleware {
    () : any;
}

interface RequestLogger {
    middleware: middleware
}

export default RequestLogger;