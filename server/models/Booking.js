import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define(
  "Booking",
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
    tableName: "bookings",
    timestamps: false,
  }
);

export default Booking;
