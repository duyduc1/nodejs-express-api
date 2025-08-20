const express = require('express');
const morgan = require('morgan');
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use("/api", routes);
app.use(errorMiddleware);

module.exports = app;