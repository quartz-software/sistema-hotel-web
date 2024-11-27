import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomRoomRate = sequelize.define(
  "RoomRoomRate",
  {
    roomId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "rooms",
        key: "id",
      },
    },
    roomRateId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "room_rates",
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["roomId", "roomRateId"],
      },
    ],
    tableName: "room_room_rates",
    timestamps: false,
  }
);

export default RoomRoomRate;
