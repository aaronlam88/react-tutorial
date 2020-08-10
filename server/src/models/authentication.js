import _sequelize from "sequelize";
const { Sequelize, DataTypes } = _sequelize;
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
      type: DataTypes.STRING,
      primaryKey: true,
    },
    version: DataTypes.NUMBER,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    create_time: DataTypes.DATE,
  },
  {
    tableName: "authentication",
    timestamps: false,
  },
);

export default Authentication;
