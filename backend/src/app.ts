import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { loggerMiddleware, errorMiddleware } from './middlewares';
import { connectDB } from './config';

export default class App {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeDBConnection();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  private initializeMiddleware(): void {
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(loggerMiddleware);
  }

  private initializeErrorHandler(): void {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes(): void {
    // this.app.use('/api/auth', new AuthRoutes().router);
  }

  private initializeDBConnection(): void {
    connectDB();
  }

  public listen(): void {
    this.app.listen(this.port, () =>
      console.log(`App listening on the port ${this.port}`),
    );
  }
}
