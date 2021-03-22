const express = require('express');
const userRouter = require('./router/user-route');
const errCtrl = require('./controller/error-ctrl');
const app = express();
app.use(express.json());

app.use("/", userRouter);

app.use(errCtrl);

module.exports = app;

