import express from "express";
import { tokenGenerator } from "./token_generator.js";
import log from "../utils/log/winston_logger.js";

const router = express.Router();
/* POST login. */
router.post("/", (req, res, _next) => {
  const { username, password } = req.body;
  log.debug(`Login for username: ${username}`);
  tokenGenerator(username, password)
    .then((token) =>
      res.json({
        success: true,
        token,
      }),
    )
    .catch(() =>
      res.status(401).json({
        success: false,
        token: null,
        error: "Username or password is incorrect",
      }),
    );
});

export default router;
