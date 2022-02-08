import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '../exceptions';
import { User } from '../interfaces';
import { UserService } from '../services';

export class AuthController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = request.body;
      const user = await this.service.findByEmail(email);

      if (!user) throw new BadRequestException('Invalid email or password');

      const passwordMatch = await user.validatePassword(password);

      if (!passwordMatch)
        next(new BadRequestException('Invalid email or password'));

      const token = await user.generateJwt();

      return response.status(200).json({ success: true, token });
    } catch (error) {
      next(error);
    }
  };

  public reqister = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const user: User = request.body;

      const existing = await this.service.findByEmail(user.email);

      if (existing) next(new BadRequestException('Email already exists'));

      await this.service.create(user);

      return response
        .status(201)
        .json({ success: true, message: 'User successfully registered' });
    } catch (error) {
      next(error);
    }
  };
}
