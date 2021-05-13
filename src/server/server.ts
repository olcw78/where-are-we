import {
  HandleUncaughtException,
  HandleUnhandledRejection,
} from "./controller/error-ctrl";
HandleUncaughtException();

import mongoose from "mongoose"; // ORM <- mongoDB
import dotenv from "dotenv"; // node.js .env
import App from "./app";

class Server {
  private readonly app: App;
  private readonly dbURL: string;
  private readonly envPath: string;

  constructor() {
    this.app = new App();
    this.envPath = `${__dirname}/config.env`;
    dotenv.config({ path: this.envPath });

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
    const server = this.app.getApp.listen(process.env.PORT!, () => {
      console.log(`App is running on port ${process.env.PORT!}...`);
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
