const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userHandler = require("./route/userHandler");

const app = express();
dotEnv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5000;

//database connection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/megaMart")
  .then(() => console.log("database connection successfull"));

//route
app.use("/api", userHandler);

//listen server
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
