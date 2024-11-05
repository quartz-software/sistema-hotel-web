import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ServiceRoom = sequelize.define(
  "ServiceRoom",
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
    tableName: "services_rooms",
    timestamps: false,
  }
);

export default ServiceRoom;
