import { Router } from 'express';
import { authMiddleware } from '../middlewares';
import { UserController } from '../controllers';

export class UserRoute {
  public router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/me', authMiddleware, this.controller.getAuthUser);
    this.router.get('/', authMiddleware, this.controller.getAllUsers);
  }
}
