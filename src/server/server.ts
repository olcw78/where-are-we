import {
  HandleUncaughtException,
  HandleUnhandledRejection,
} from "./controller/Error-ctrl";
HandleUncaughtException();

import mongoose from "mongoose";
import dotenv from "dotenv";
import App from "./app";

class Server {
  private readonly app: App;
  private readonly dbURL: string;
  private readonly envPath: string;
  private readonly portNum: number;

  constructor() {
    this.app = new App();
    this.envPath = `${__dirname}/config.env`;
    dotenv.config({ path: this.envPath });

    this.portNum = +process.env.PORT!;
    this.dbURL = process.env.DATABASE!.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD!
    );
  }

  async Connect() {
    const connectOptions: mongoose.ConnectOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };

    await mongoose.connect(this.dbURL, connectOptions);
    console.log("DB is connected to mongoDB!");
  }

  Start() {
    const server = this.app.getApp.listen(this.portNum!, () => {
      console.log(`App is running on port ${this.portNum!}...`);
    });
    HandleUnhandledRejection(server);

    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("Process terminated");
      });
    });
  }
}

const server = new Server();
server.Start();
// You can't use top-level await keyword due to this reason.
// - Top-level 'await' expressions are only allowed when the 'module' option is set to 'esnext' or 'system', and the 'target' option is set to 'es2017' or higher.ts(1378)
// const res = await server.Connect();
server.Connect().catch((err) => console.error(err));
