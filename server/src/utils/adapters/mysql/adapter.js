/**
 * This object will handle connection from mysql database.
 * Required the following environment variables:
 * - MYSQL_HOST: mysql database hostname
 * - MYSQL_PORT: mysql database port number
 * - MYSQL_USER: mysql username
 * - MYSQL_PASS: mysql password
 * Extra setting can be supplied by setting.json file
 */
import mysql from "mysql";

// import setting from setting.json file
import setting from "./setting.json";

// setup log
import log from "../../log/winston_logger.js";

// setup mysql connection variables with environment variables
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;

/**
 * Create mysql connection pool, see https://www.npmjs.com/package/mysql
 */
const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  ...setting,
});

pool.on("acquire", function (connection) {
  log.debug("Connection %d acquired", connection.threadId);
});

pool.on("connection", (connection) => {
  log.debug("new connection %d", connection.threadId);
});

pool.on("enqueue", function () {
  log.debug("Waiting for available connection slot");
});

export const sql = ({ database, sqlStmt }) => {
  if (!database || !sqlStmt) {
    throw "all parameters are required!";
  }
  return new Promise((resolve) =>
    pool.getConnection((error, connection) => {
      if (error) {
        log.error(error);
      }
      connection.changeUser({
        database,
      });
      connection.query(sqlStmt, (connectionError, result) => {
        if (connectionError) {
          log.error(connectionError);
        }
        connection.release();
        resolve(result);
      });
    }),
  );
};

export const prepare = ({ database, prepareStmt, params }) => {
  if (!database || !prepareStmt || !params) {
    throw "all parameters are required!";
  }
  return new Promise((resolve) =>
    pool.getConnection((error, connection) => {
      if (error) {
        log.error(error);
      }
      connection.changeUser({
        database,
      });
      connection.query(prepareStmt, params, (connectionError, result) => {
        if (connectionError) {
          log.error(connectionError);
        }
        connection.release();
        resolve(result);
      });
    }),
  );
};

export default pool;
