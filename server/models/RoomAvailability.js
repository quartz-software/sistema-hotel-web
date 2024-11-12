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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "rooms",
      },
    },
  },
  {
    tableName: "room_availabilities",
    timestamps: false,
  }
);

export default RoomAvailability;
