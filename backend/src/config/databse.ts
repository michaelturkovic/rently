import mongoose from 'mongoose';
import { logger } from './logger';
import { config } from './env-config';

export const connectDB = async () => {
  const { SERVER, PORT, DATABASE_NAME, USER, PASSWORD } = config.DB;

  await mongoose.connect(`mongodb://${SERVER}:${PORT}`, {
    dbName: DATABASE_NAME,
    auth:
      config.ENVIRONMENT === 'production'
        ? { username: USER, password: PASSWORD }
        : undefined,
  });
  logger.info('Database connected');
};
