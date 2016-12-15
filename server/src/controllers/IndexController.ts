import CoreController from "../core/modules/base/CoreController";
import Methods from '../core/modules/base/CoreHttpMethods';
import {BaseUrl, Route} from "../core/modules/base/CoreDecorators";
import {Request, Response} from "express";

@BaseUrl("/index")
export default class IndexController extends CoreController {
    constructor() {
        super();
    }

    @Route(Methods.GET, '/')
    indexAction(req: Request, res: Response) {
        res.send({
            controller: 'index',
            action: 'get'
        });
    }

    @Route(Methods.POST, '/')
    addAction(req: Request, res: Response) {
        res.send({
            controller: 'index',
            action: 'post'
        });
    }
}