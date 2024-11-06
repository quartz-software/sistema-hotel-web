import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Client from "./Client.js";

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
    numAdultos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    },
    numNinos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      }
    },
    fechaReceva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['En Curso', 'Cancelada', 'Teminada', 'Pendiente']]
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.0,
      }
    },
    bookingOrigin: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    idEmployee: {
    },
    idCliet: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Client,
        key: 'id'
      }
    }
  },
  {
    tableName: "bookings",
    timestamps: false,
  }
);

export default Booking;
