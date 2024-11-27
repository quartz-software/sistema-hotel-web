import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    restrictions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isIn: [["room service", "cleaning", "wellness", "transport", "other"]],
      },
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [["usd", "bs"]],
      },
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        min: 0.0,
      },
    },
    openHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closeHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "services",
    timestamps: false,
  }
);

export default Service;
