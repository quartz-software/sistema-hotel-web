import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "clients",
    timestamps: false,
  }
);

export default Client;
