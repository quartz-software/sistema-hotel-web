import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["cleaning", "maintanance", "recepcionist", "admin"]],
      },
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["active", "inactive", "training", "fired"]],
      },
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

export default Employee;
