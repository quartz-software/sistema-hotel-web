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
  },
  {
    tableName: "room_promotions",
    timestamps: false,
  }
);

export default RoomPromotion;
