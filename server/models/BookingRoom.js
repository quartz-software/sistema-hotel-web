import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BookingRoom = sequelize.define(
  "BookingRoom",
  {
    idBooking: {
      type: DataTypes.INTEGER,
      references: {
        model: "bookings",
        key: "id",
      },
    },
    idRoom: {
      type: DataTypes.INTEGER,
      references: {
        model: "rooms",
        key: "id",
      },
    },
  },
  {
    tableName: "bookings_rooms",
    timestamps: false,
  }
);

export default BookingRoom;
