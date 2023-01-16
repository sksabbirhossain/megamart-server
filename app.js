const express = require("express");
const dotEnv = require("dotenv");

const app = express();
dotEnv.config();
const port = process.env.PORT || 5000;

//route
app.get("/", (req, res) => {
  res.send("hello world");
});

//listen server
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
