import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Stock = sequelize.define(
  "Stock",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    name: {
      type: DataTypes.STRING(75),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      }
    },
    measure: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        //isIn: [[]],
        notEmpty: true,
      }
    },
    supplyDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    }
  },
  {
    tableName: "stock",
    timestamps: false,
  }
);

export default Stock;
