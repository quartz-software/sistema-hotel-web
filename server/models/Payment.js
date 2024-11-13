import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define(
  "Payment",
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
      validate: {
        isDate: true,
      },
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.0,
      },
    },
    paymentMethod: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        isIn: ["card", "cash"],
      },
    },
    status: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        isIn: ["pending", "cancelled"],
      },
    },
    bookingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isInt: true,
      },
      references: {
        model: "bookings",
        key: "id",
      },
    },
  },
  {
    tableName: "payments",
    timestamps: false,
  }
);

export default Payment;
