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
      defaultValue: 'pendiente',
      validate: {
        isIn: [['pendiente', 'en progreso', 'completada']],
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateCreate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
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
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "rooms",
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
