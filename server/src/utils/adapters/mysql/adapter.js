import mysql from 'mysql';
import dotenv from 'dotenv'
// import setting from setting.json file
import setting from './setting.json';
// set env variables with .env file
dotenv.config();

const { connectionLimit, queueLimit } = setting;
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;

const pool = mysql.createPool({
  host,
  user,
  password,
  connectionLimit,
  queueLimit,
});

export default pool;
