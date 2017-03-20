import CoreController from '../core/modules/base/CoreController';
import IHashTable from '../core/interfaces/IHashTable';

import IndexController from './IndexController';
import UserController from './UserController';

const controllers: IHashTable<CoreController> = {
  IndexController,
  UserController
};

export default controllers;
