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
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    employeeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
      }
    },
    stockId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "stock",
        key: "id",
      }
    }

  },
  {
    tableName: "stock_modifications",
    timestamps: false,
  }
);

export default StockModification;
