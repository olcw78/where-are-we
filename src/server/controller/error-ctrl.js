const http = require("http");
const AppError = require("../util/app-error");

const UncaughtException = () => {
  process.on("uncaughtException", function (err) {
    console.log("Uncaught Exception occurred! 🙄");
    console.log(err.name, err.message, err.stack);
    process.exit(1);
  });
};

const UnhandledRejection = server => {
  process.on("uncaughtException", function (err) {
    console.log("Unhandled Rejection occurred! 🙄");
    console.log(err.name, err.message, err.stack);
    server.close(() => {
      process.exit(1);
    });
  });
};

module.exports = (err, req, res, _) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.error(err);

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports.UncaughtException = UncaughtException;
module.exports.UnhandledRejection = UnhandledRejection;
