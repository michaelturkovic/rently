import { Request, Response, NextFunction } from 'express';
import { logger } from '../config';

export const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  logger.info(`Request: ${request.method} ${request.path}`);
  next();
};
