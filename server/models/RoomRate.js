import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomRate = sequelize.define(
  "RoomRate",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    isActive: {
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
    tableName: "room_rates",
    timestamps: false,
  }
);

export default RoomRate;
