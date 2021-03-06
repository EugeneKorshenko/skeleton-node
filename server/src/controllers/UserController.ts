import {Request, Response} from 'express';
import CoreController from '../core/modules/base/CoreController';
import {Controller, Route} from '../core/modules/base/CoreExpressDecorators';
import Methods from '../core/modules/base/CoreHttpMethods';
const {GET, POST, PATCH, DELETE} = Methods;

@Controller('/user')
class UserController extends CoreController {

  @Route(GET, '/')
  public async listAction (req: Request, res: Response) {
    res.send('');
  }

  @Route(GET, '/:id')
  public async oneAction (req: Request, res: Response) {
    let userId = req.params.id;
    console.log(userId);
    res.send('');
  }

  @Route(POST, '/')
  public async createAction (req: Request, res: Response) {
    res.send('');
  }

  @Route(PATCH, '/:id')
  public async patchAction (req: Request, res: Response) {
    let userId = req.params.id;
    console.log(userId);
    res.send('');
  }

  @Route(DELETE, '/:id')
  public async deleteAction (req: Request, res: Response) {
    let userId = req.params.id;
    console.log(userId);
    res.send('');
  }
}

export default new UserController();
