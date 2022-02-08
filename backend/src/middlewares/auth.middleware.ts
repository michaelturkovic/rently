import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException, ForbidenException } from '../exceptions';
import { config } from '../config';
import { UserModel } from '../models';

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) throw new ForbidenException();

    const token = authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt.verify(token, config.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);
    if (!user) next(new ForbidenException());

    request.user = decoded.id;

    next();
  } catch (error) {
    return next(new UnauthorizedException());
  }
};
