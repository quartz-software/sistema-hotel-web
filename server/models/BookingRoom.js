import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BookingRoom = sequelize.define(
  "BookingRoom",
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
    tableName: "bookings_rooms",
    timestamps: false,
  }
);

export default BookingRoom;
