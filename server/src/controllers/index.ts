import IController from '../core/interfaces/IController';
import IHashTable from '../core/interfaces/IHashTable';

import IndexController from './IndexController';
import UserController from './UserController';

const controllers: IHashTable<IController> = {
  IndexController,
  UserController
};

export default controllers;
