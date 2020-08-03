import { Sequelize, DataTypes as type } from "sequelize";
let sequelize = new Sequelize(
  "user_schema",
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
  },
);

const User = sequelize.define("user", {
  user_id: {
    type: type.STRING,
    primaryKey: true,
  },
  user_group_id: type.STRING,
  email: {
    type: type.STRING,
    allowNull: false,
  },
  first_name: type.STRING,
  last_name: type.STRING,
  status: type.ENUM("Enabled", "Disabled", "Suspended", "Expired"),
  profile: type.JSON,
  extra: type.JSON,
  create_time: type.DATE,
  modify_by_user_id: type.STRING,
});

export default User;
