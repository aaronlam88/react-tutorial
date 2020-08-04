import encodings from "mysql2/node_modules/iconv-lite/lib/index.js";

encodings.encodingExists("foo");

import User from "./user.js";

describe("User Schema Test", () => {
  test("user table connection", async (done) => {
    await User.findOne({
      where: {
        email: "admin",
      },
    }).then((user) => {
      console.log(JSON.stringify(user));
      expect(user).not.toBeNull();
    });
    done();
  });
});
