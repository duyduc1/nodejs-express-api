const express = require('express');
const morgan = require('morgan');
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const configureCloudinary = require("../config/cloudinary")

const app = express();

configureCloudinary()

app.use(express.json());
app.use(morgan('dev'));

app.use("/api", routes);

app.use(errorMiddleware);

module.exports = app;