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
    nAdults: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    nChild: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [["in progress", "cancelled", "finished", "pending"]],
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.0,
      },
    },
    bookingOrigin: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [["external", "system"]],
      },
    },
    employeeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
    },
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "clients",
        key: "id",
      },
    },
  },
  {
    tableName: "bookings",
    timestamps: false,
  }
);

export default Booking;
