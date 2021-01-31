const express = require("express");
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const userRouter = require("./router/user-route");
const errCtrl = require("./controller/error-ctrl");

const app = express();

// middlewares - mounst routers.

// 1. Secured HTTP headers
app.use(helmet());

// 2. Limit request from the same IP
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message:
    "Too many requests from the same IP address, please try again in 1 hour.",
});
app.use("/", limiter);

// 3. Development logging
process.env.NODE_ENV !== process.env.NODE_ENV?.trim() || "development";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Sanitize data against NoSQL query injection
app.use(mongoSanitize());

// Sanitize data against XSS attack
app.use(xss());

// Prevent parameter pollution
app.use(hpp({ whitelist: [] }));

// route
app.use("/", userRouter);

// error
app.use(errCtrl);

module.exports = app;
