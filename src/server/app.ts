import express from "express";
import morgan from "morgan"; // development logging in specific
import rateLimit from "express-rate-limit"; // Limit request from the same IP
import helmet from "helmet"; // Secured HTTP headers
import mongoSanitize from "express-mongo-sanitize"; // Sanitize data against NoSQL query injection
const xss = require("xss-clean"); // Sanitize data against XSS attack
import hpp from "hpp"; // Prevent parameter pollution
import bodyParser from "body-parser";
import cors from "cors"; // Allow cors
import path from "path"; // get path for static filing. -> ./dist

import { router } from "./router/User-route";
import errCtrl from "./controller/Error-ctrl";

class App {
  private readonly app: any;
  get getApp(): any {
    return this.app;
  }

  constructor() {
    this.app = express();

    // middlewares - mount routers.
    // 1. Secured HTTP headers
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );

    // 2. Limit request from the same IP
    const limiter = rateLimit({
      max: 1000,
      windowMs: 60 * 60 * 1000,
      message:
        "Too many requests from the same IP address, please try again in 1 hour.",
    });
    this.app.use("/", limiter);

    // 3. Development logging
    // process.env.NODE_ENV !== process.env.NODE_ENV?.trim() || "development";
    // if (process.env.NODE_ENV === "development") {
    // }
    this.app.use(morgan("dev"));

    // Body parser, reading data from body into req.body
    // this.app.use(express.json({ limit: "10kb" }));
    // this.app.use(express.json());

    // using deprecated bodyParser due to naver map API cdn.
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Sanitize data against NoSQL query injection
    this.app.use(mongoSanitize());

    // Sanitize data against XSS attack
    this.app.use(xss());

    // Prevent parameter pollution
    this.app.use(hpp({ whitelist: [] }));

    // Allow cors
    const corsOption = {
      origin: "http://127.0.0.1:1234",
      credentials: true,
    };
    this.app.use(cors(corsOption));
    // or use default options
    // this.app.use(cors());

    // static files
    // this.app.use("/app", express.static(path.join(__dirname, "../app")));

    // routers
    this.app.use("/", router);

    // errors
    this.app.use(errCtrl);
  }
}

export default App;
