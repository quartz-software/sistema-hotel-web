import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomRoomPromotion = sequelize.define(
  "RoomRoomPromotion",
  {
    roomId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "rooms",
        key: "id",
      },
    },
    roomPromotionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "room_promotions",
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["roomId", "roomPromotionId"],
      },
    ],
    tableName: "room_room_promotions",
    timestamps: false,
  }
);

export default RoomRoomPromotion;
