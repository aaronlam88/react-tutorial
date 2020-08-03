const MySQLSetting = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  connectionLimit: 100,
  queueLimit: 5,
  connectTimeout: 60000,
};

export default MySQLSetting;
