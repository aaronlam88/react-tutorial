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

const User = sequelize.define(
  "user",
  {
    user_id: { type: type.STRING, primaryKey: true },
    user_group_id: { type: type.STRING, allowNull: true },
    email: { type: type.STRING, allowNull: false },
    first_name: { type: type.STRING, allowNull: true },
    last_name: { type: type.STRING, allowNull: true },
    status: type.ENUM("Enabled", "Disabled", "Suspended", "Expired"),
    profile: { type: type.JSON, allowNull: true },
    extra: { type: type.JSON, allowNull: true },
    create_time: { type: type.DATE, allowNull: false },
    modify_by_user_id: { type: type.STRING, allowNull: true },
  },
  {
    tableName: "user",
    timestamps: false,
  },
);

export default User;
