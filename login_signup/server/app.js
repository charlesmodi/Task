const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/conn");
//const User = require('./model/userSchema')

app.use(express.json());

//link out route files
app.use(require("./router/auth"));

const PORT = process.env.PORT;

//middelware

const middleware = (req, res, next) => {
  console.log("Hello my middle ware");
  next();
};

// request

app.get("/", (req, res) => res.send("Hello World from the server"));

app.get("/about", middleware, (req, res) => {
  console.log("Hello my about");
  res.send("Hello about World from the server");
});

app.get("/contact", (req, res) =>
  res.send("Hello contact World from the server")
);

app.get("/signin", (req, res) =>
  res.send("Hello signin World from the server")
);

app.get("/signup", (req, res) =>
  res.send("Hello registration World from the server")
);

app.listen(PORT, () => {
  console.log(`server is runing at ${PORT}`);
});
