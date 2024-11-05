import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomAvailability = sequelize.define(
  "RoomAvailability",
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
    tableName: "room_availabilities",
    timestamps: false,
  }
);

export default RoomAvailability;
