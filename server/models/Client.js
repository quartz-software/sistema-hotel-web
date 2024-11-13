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
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastname1: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname2: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    dni: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    documentType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
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
