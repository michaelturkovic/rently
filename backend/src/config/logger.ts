import winston from 'winston';
import { config } from './env-config';

const level = config.ENVIRONMENT === 'development' ? 'info' : 'warn';

export const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.align(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});
