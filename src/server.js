const errCtrl = require("./controller/error-ctrl");
errCtrl.UncaughtException();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

(async () => {
  const envPath = `${__dirname}/config.env`;
  dotenv.config({ path: envPath });

  const dbURL = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  await mongoose.connect(dbURL, connectOptions);
  console.log("DB is connected to mongoDB!");

  const server = app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}...`);
  });
  errCtrl.UnhandledRejection(server);

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Process terminated");
    });
  });
})();
