import {Request, Response} from 'express';
import CoreController from '../core/modules/base/CoreController';
import {Controller, Route} from '../core/modules/base/CoreExpressDecorators';
import Methods from '../core/modules/base/CoreHttpMethods';
const {GET} = Methods;

@Controller('/error/throw')
class ErrorThrowingController extends CoreController {

  @Route(GET, '/')
  public async indexAction (req: Request, res: Response) {
    let message: string = req.query.message || '';
    throw new Error(`Fake Error occurred. It should be correctly logged: ${message}`);
  }
}

export default new ErrorThrowingController();
