import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomRate = sequelize.define(
  "RoomRate",
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
    tableName: "room_rates",
    timestamps: false,
  }
);

export default RoomRate;
