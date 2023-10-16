const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//mongooose connect
mongoose.connect(
  "mongodb+srv://ishitaamod:" +process.env.MONGO_ATLAS_PW+
    "@cluster0.qt4ch8d.mongodb.net/?retryWrites=true&w=majority"
  
);
//Logger- morgan
app.use(morgan("dev"));

//Body Parser for handling request and response
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS Error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Methods", "PUT,POST,DELETE,GET,PATCH");
    return res.status(200).json({});
  }
  next();
});

//setup middleware
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//Not able to reach any route , then this runs
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
//If database operations fail , 500 error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
