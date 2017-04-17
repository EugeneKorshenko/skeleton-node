import IController from '../core/interfaces/IController';
import IHashTable from '../core/interfaces/IHashTable';

import IndexController from './IndexController';
import UserController from './UserController';
import ErrorThrowingController from './ErrorThrowingController';

const controllers: IHashTable<IController> = {
  IndexController,
  UserController,
  ErrorThrowingController
};

export default controllers;
