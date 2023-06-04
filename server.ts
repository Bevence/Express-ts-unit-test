import express, { NextFunction, Request, Response } from "express";

import indexRoutes from "./src/routes";

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    this.app.use("/api/v1", indexRoutes);

    // Error handling middleware
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction): void => {
        res.status(500).json({
          status: false,
          message: error.message ? error.message : "Internal server error",
        });
      }
    );
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server(3000);
server.start();
