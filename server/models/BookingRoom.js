import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BookingRoom = sequelize.define(
  "BookingRoom",
  {
    bookingId: {
      type: DataTypes.INTEGER,
      references: {
        model: "bookings",
        key: "id",
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: "rooms",
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["bookingId", "roomId"],
      },
    ],
    tableName: "bookings_rooms",
    timestamps: false,
  }
);

export default BookingRoom;
