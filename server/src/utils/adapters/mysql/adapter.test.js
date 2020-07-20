import pool, { sql } from "./adapter.js";

const account_schema = [
  { Tables_in_account_schema: "account" },
  { Tables_in_account_schema: "account_group" },
  { Tables_in_account_schema: "resource" },
];

describe("MySQL Adapter Test", () => {
  test("test sql with connection", async (done) => {
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      // Use the connection
      connection.changeUser({
        database: "account_schema",
      });
      connection.query("show tables;", (error, result) => {
        expect(result).toEqual(account_schema);
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        // Don't use the connection here, it has been returned to the pool.
        done();
      });
    });
  });

  test("test sql with promise", async () => {
    await sql({ database: "account_schema", sqlStmt: "show tables;" }).then(
      (result) => {
        console.log(result);
        expect(result).toEqual(account_schema);
      },
    );
  });
});

afterAll(() => {
  pool.end();
});
