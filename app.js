var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var methodOverride = require("method-override");
var directory = require("./directories");
var routes = require("./routes");

var app = express();

// view engine setup
app.set("views", directory.templatesDir);
app.set("view engine", "ejs");
app.set("trust proxy", true);

// locals
// app.locals = {};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(directory.assetsDir));
app.use(cors());
app.use(session({ secret: "pPv7BWbsI2GAz7NDDRGwpkWJZPx1IPJd" }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    } else if (
      req.query &&
      typeof req.query === "object" &&
      "_method" in req.query
    ) {
      // look in urlencoded GET bodies and delete it
      var method = req.query._method;
      delete req.query._method;
      return method;
    }
  })
);

routes.map(({ name, route }) => {
  app.use(name, route);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
