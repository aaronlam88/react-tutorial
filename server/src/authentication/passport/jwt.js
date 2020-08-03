import passport from "passport";
import crypto from "crypto";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import log from "../../utils/log/winston_logger.js";
import Authentication from "../../models/authentication.js";
import Session from "../../models/session.js";

// error message
const errorMsg = "Username or password is incorrect";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        Authentication.findOne({
          where: {
            email: username,
          },
        }).then((auth) => {
          if (auth == null) {
            log.debug("Incorrect username");
            throw errorMsg;
          }
          const salt = auth.salt;
          const hashValue = crypto
            .createHash("sha256")
            .update(password + salt)
            .digest("hex");
          if (!auth || auth["hash"] !== hashValue) {
            log.debug("Incorrect password");
            throw errorMsg;
          }
          return done(null, auth);
        });
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  "jwt",
  new JwtStrategy(opts, (jwtPayload, done) => {
    try {
      Session.findOne({
        where: { session_id: jwtPayload.id },
      }).then((session) => {
        if (session) {
          log.debug("Login");
          done(null, session);
        } else {
          log.error(`Invalid session_id: ${jwtPayload.id}`);
          done(null, false);
        }
      });
    } catch (error) {
      done(error);
    }
  }),
);
