import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import path, { join } from "path";
// setup log
import logger from "morgan";
import log from "./src/utils/log/winston_logger.js";

const __dirname = path.resolve();
const clientPath = join(__dirname, "../client/build/");
const staticsPath = join(__dirname, "./statics/");
const errorPath = join(staticsPath, "errors");
const error404 = fs.readFileSync(join(errorPath, "404"), "utf-8");
const error500 = fs.readFileSync(join(errorPath, "500"), "utf-8");

const app = express();
// set view engine, use pug
app.set("view engine", "pug");

// adding Helmet to enhance your API security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(logger("combined"));

// Content-Type parsing
// parse application/json
app.use(bodyParser.json());
// parse text/plain
app.use(bodyParser.text());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// add cookie parser
app.use(cookieParser());

// add public directory
app.use(express.static(clientPath));
// add client index page
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// error handler
// handle 500
app.use((err, req, res, _next) => {
  log.error(err.stack);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).render("error.pug", { message: error500 });
});

// add route
import login from "./src/authentication/login.js";
app.use("/login", login);

// need to be last route, handle 404
app.get("*", (req, res) => {
  log.error(req);
  res.status(404).render("error.pug", { message: error404 });
});

export default app;
