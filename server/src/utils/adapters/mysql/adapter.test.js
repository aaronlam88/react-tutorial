import pool from './adapter.js';

describe('MySQL Adapter Test', () => {
  test('should create connection pool successfully', async (done) => {
    pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!

      // Use the connection
      connection.changeUser({
        database: 'account_schema'
      })
      connection.query('show tables;', (error, results) => {
        console.log(results);

        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
        done();
      });
    });
  })
})


afterAll(() => {
  pool.end();
})
