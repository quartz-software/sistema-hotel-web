import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const StockModification = sequelize.define(
  "StockModification",
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
    tableName: "stock_modifications",
    timestamps: false,
  }
);

export default StockModification;
