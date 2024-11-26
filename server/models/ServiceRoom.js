import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ServiceRoom = sequelize.define(
  "ServiceRoom",
  {
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: "services",
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
    tableName: "services_rooms",
    timestamps: false,
  }
);

export default ServiceRoom;
