import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions';
import { logger } from '../config/logger';

export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.error(error.message);

  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  response.status(status).json({ success: false, message });
};
