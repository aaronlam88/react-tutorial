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

const Session = sequelize.define(
  "session",
  {
    session_id: {
      type: type.STRING,
      primaryKey: true,
    },
    user_id: {
      type: type.STRING,
      allowNull: false,
    },
    version: type.NUMBER,
    type: type.STRING,
    extra: type.JSON,
    time_to_live: type.NUMBER,
    create_time: type.DATE,
  },
  {
    tableName: "session",
  },
);

export default Session;
