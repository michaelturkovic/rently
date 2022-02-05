import dotenv from 'dotenv';

dotenv.config();

export const config = {
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 8080,
  DB: {
    SERVER: process.env.DB_SERVER,
    PORT: process.env.DB_PORT,
    DATABASE_NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
};
