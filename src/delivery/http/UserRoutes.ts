import { Router } from 'express';
import { UserController } from './UserController';

export const createUserRouter = (userController: UserController): Router => {
  const router = Router();
  
  router.post('/users', (req, res) => userController.createUser(req, res));

  return router;
};
