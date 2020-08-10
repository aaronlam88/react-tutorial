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

const Session = sequelize.define(
  "session",
  {
    session_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: DataTypes.NUMBER,
    type: DataTypes.STRING,
    extra: DataTypes.JSON,
    time_to_live: DataTypes.NUMBER,
    create_time: DataTypes.DATE,
  },
  {
    tableName: "session",
    timestamps: false,
  },
);

export default Session;
