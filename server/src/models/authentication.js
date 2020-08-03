import { Sequelize, DataTypes as type } from "sequelize";
let sequelize = new Sequelize(
  "privilege_schema",
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
  },
);

const Authentication = sequelize.define(
  "authentication",
  {
    user_id: {
      type: type.STRING,
      primaryKey: true,
    },
    version: type.NUMBER,
    email: {
      type: type.STRING,
      allowNull: false,
    },
    hash: type.STRING,
    salt: type.STRING,
    create_time: type.DATE,
  },
  {
    tableName: "authentication",
  },
);

export default Authentication;
