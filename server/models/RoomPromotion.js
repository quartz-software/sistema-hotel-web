import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomPromotion = sequelize.define(
  "RoomPromotion",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: ["active", "inactive", "expired"],
      },
    },
  },
  {
    tableName: "room_promotions",
    timestamps: false,
  }
);

export default RoomPromotion;
