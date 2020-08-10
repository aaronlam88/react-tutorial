import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path, { join } from "path";
// setup log
import logger from "morgan";

const __dirname = path.resolve();
const clientPath = join(__dirname, "../client/build/");

const app = express();
// set view engine, use pug
app.set("view engine", "pug");

// adding Helmet to enhance your API security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// add morgan to log HTTP requests
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

// add route
import login from "./src/routes/login.js";
app.use("/login", login);

export default app;
