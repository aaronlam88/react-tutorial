import jwt from "jsonwebtoken";
import crypto from "crypto";
import expressJwt from "express-jwt";
import { prepare } from "../utils/adapters/mysql/adapter.js";
import log from "../utils/log/winston_logger.js";

// sql to get user object from username
const loginSQL =
  "SELECT * FROM user_schema.user as u join privilege_schema.authentication as a WHERE u.user_id = a.user_id AND u.email = ?;";
// error message
const error = "Username or password is incorrect";
// get jwt secret from environment variable
const secret = process.env.JWT_SECRET;
// set default expire time to 1 hour
const expiresIn = "1h";

export const jwtMiddleWare = expressJwt({ secret, algorithms: ["HS256"] });

export const tokenGenerator = async (username, password) => {
  if (!username || !password) {
    log.debug("Missing username or password");
    throw error;
  }
  const data = await prepare({
    database: "user_schema",
    prepareStmt: loginSQL,
    params: [username],
  });
  if (!data) {
    log.debug("Username not found");
    throw error;
  }
  const user = data[0];
  const salt = user.salt;
  const hashValue = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
  if (!user || user["hash"] !== hashValue) {
    log.debug("Incorrect password");
    throw error;
  }

  return jwt.sign({ username, password }, secret, { expiresIn });
};
