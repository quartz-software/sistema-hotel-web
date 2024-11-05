import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomImage = sequelize.define(
  "RoomImage",
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
    tableName: "room_images",
    timestamps: false,
  }
);

export default RoomImage;
