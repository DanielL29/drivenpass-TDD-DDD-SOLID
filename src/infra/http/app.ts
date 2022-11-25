import "dotenv/config";
import * as express from "express";
import "express-async-errors";
import cors from "cors";
import { Application } from "@core/infra/application";
import { ServerRoute } from "./routes/server-route";
import { ErrorHandler } from "./middlewares/error-handler";

export class ExpressApp extends Application {
  private readonly name: string;
  private readonly router: express.Router;
  private readonly app: express.Application;

  constructor() {
    super();

    this.name = `NODE-APP-${process.env.NODE_ENV}`;
    this.app = express.default();
    this.router = new ServerRoute().router;

    this.configDependencies();
  }

  protected configDependencies(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(this.router);
    this.app.use(ErrorHandler.handleExceptions);
  }

  public get application(): express.Application {
    return this.app;
  }

  public async init(): Promise<void> {
    const { PORT, HOST } = process.env;

    console.clear();

    // PRISMA

    this.app.listen(Number(PORT) || 5000, HOST!, () => {
      console.log(`${this.name} server is running on port ${PORT}`);
    });
  }
}
