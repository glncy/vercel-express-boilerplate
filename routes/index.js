const express = require("express");
const csrf = require("csurf");
const multer = require("multer");

const Controllers = require("./../src/controllers");
const Middlewares = require("./../src/middlewares");


// Routes
const main = require("./main");

let router = express.Router();
let csrfProtection = csrf({ cookie: true });
let storage = multer.memoryStorage();
let upload = multer({ storage });

const config = {
  router,
  csrfProtection,
  upload,
  Controllers,
  Middlewares
}

module.exports = [
  {
    name: "/",
    route: main(config),
  },
];
