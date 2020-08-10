import jwt from "jsonwebtoken";
import crypto from "crypto";
import expressJwt from "express-jwt";
import log from "../utils/log/winston_logger.js";
// import models
import Authentication from "../models/authentication.js";
// error message
const error = "Username or password is incorrect";
// get jwt secret from environment variable
const secret = process.env.JWT_SECRET;
// set default expire time to 1 hour
const expiresIn = "1h";

export const jwtMiddleWare = expressJwt({ secret, algorithms: ["HS256"] });

export const tokenGenerator = (username, password) => {
  if (!username || !password) {
    log.debug("Missing username or password");
    throw error;
  }
  return new Promise((resolve, reject) => {
    Authentication.findOne({
      where: {
        email: username,
      },
    }).then((auth) => {
      if (auth == null) {
        log.debug("Incorrect username");
        reject(error);
        return;
      }
      const salt = auth.salt;
      const hashValue = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");
      if (!auth || auth["hash"] !== hashValue) {
        log.debug("Incorrect password");
        reject(error);
        return;
      }
      resolve(jwt.sign({ username }, secret, { expiresIn }));
    });
  });
};
