/* eslint-disable no-process-exit */

import { createServer } from "http";
import app from "../app.js";
import chalk from "chalk";
import fs from "fs";
import log from "../src/utils/log/winston_logger.js";
import path, { join } from "path";

const __dirname = path.resolve();
const staticsPath = join(__dirname, "./statics/");
const errorPath = join(staticsPath, "errors");
const error404 = fs.readFileSync(join(errorPath, "404"), "utf-8");
const error500 = fs.readFileSync(join(errorPath, "500"), "utf-8");

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

// need to be last route, handle 404
app.get("*", (req, res) => {
  log.error(req);
  res.status(404).render("error.pug", { message: error404 });
});

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server.
const server = createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const _port = parseInt(val, 10);
  if (isNaN(_port)) {
    // named pipe
    return val;
  }
  if (_port >= 0) {
    // port number
    return _port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      log.error(chalk.red(bind + " requires elevated privileges"));
      throw error;
    case "EADDRINUSE":
      log.error(chalk.red(bind + " is already in use"));
      throw error;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  log.info(chalk.green("Listening on " + bind));
}
