import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Habitacion = sequelize.define(
  "Habitacion",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroHabitacion: {
      type: DataTypes.STRING(10), 
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(50), 
      allowNull: false,
    },
    precioPorNoche: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20), 
      allowNull: false,
    },
    capacidad: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    nivel: {
      type: DataTypes.STRING(10), 
      allowNull: false,
    },
  },
  {
    tableName: "habitaciones", 
    timestamps: false, 
  }
);

export default Habitacion;
