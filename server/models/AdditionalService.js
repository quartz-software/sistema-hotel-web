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
  },
  {
    tableName: "additional_services",
    timestamps: false,
  }
);

export default AdditionalService;
