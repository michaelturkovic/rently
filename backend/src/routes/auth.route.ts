import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRoute {
  public router: Router;
  private controller: AuthController;

  constructor() {
    this.router = Router();
    this.controller = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/login', this.controller.login);
    this.router.post('/register', this.controller.reqister);
  }
}
