// const http = require("http");
import http from "http";
// const AppError = require("../util/app-error");
import AppError from "../util/App-error";

export const HandleUncaughtException = () => {
  process.on("uncaughtException", (err: Error): void => {
    console.log("Uncaught Exception occurred! 🙄");
    console.log(err.name, err.message, err.stack);
    process.exit(1);
  });
};

export const HandleUnhandledRejection = (server: http.Server) => {
  process.on("uncaughtException", (err: Error): void => {
    console.log("Unhandled Rejection occurred! 🙄");
    console.log(err.name, err.message, err.stack);
    server.close(() => {
      process.exit(1);
    });
  });
};

// module.exports = (err: AppError, req: any, res: any, _: any) => {
export default (err: AppError, req: any, res: any, _: any) => {
  err.setStatusCode = err.getStatusCode || 500;
  err.setStatus = err.getStatus || "error";
  console.error(err);

  res.status(err.getStatusCode).json({
    status: err.getStatus,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// module.exports.UncaughtException = HandleUncaughtException;
// module.exports.UnhandledRejection = UnhandledRejection;
