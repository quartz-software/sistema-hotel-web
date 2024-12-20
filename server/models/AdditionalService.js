import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AdditionalService = sequelize.define(
  "AdditionalService",
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
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            "pending",
            "accepted",
            "rejected",
            "in_progress",
            "completed",
            "cancelled",
            "failed",
          ],
        ],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "services",
      },
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id",
        model: "bookings",
      },
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
    tableName: "additional_services",
    timestamps: false,
  }
);

export default AdditionalService;
