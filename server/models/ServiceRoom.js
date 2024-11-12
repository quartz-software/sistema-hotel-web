import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ServiceRoom = sequelize.define(
  "ServiceRoom",
  {
    idService: {
      type: DataTypes.INTEGER,
      references: {
        model: "services",
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
    tableName: "services_rooms",
    timestamps: false,
  }
);

export default ServiceRoom;
