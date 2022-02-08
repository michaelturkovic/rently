import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../exceptions';
import { UserService } from '../services';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public getAuthUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await this.service.findById(request.user);

      if (!user) next(new NotFoundException('User not found'));

      return response.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  public getAllUsers = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const users = await this.service.findAll();

      return response.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  };
}
