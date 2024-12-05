import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "in_progress", "completed"]],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateCreate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateFinished: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "employees",
        key: "id",
      },
    },
    additionalServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "additional_services",
        key: "id",
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: false,
  }
);

export default Task;
