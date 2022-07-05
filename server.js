//requires
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); //tool for logging http request info
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//app
const app = express();

//database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => { //for unknown reason this never gets called...
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

//variables?
const port = process.env.PORT || 8000;

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//routes
const homeroute = require("./routes/user.js")

//routes
app.use("/", homeroute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})