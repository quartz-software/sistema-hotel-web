import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true, 
      },
    },
    numeroHabitacion: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true, 
      },
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true, 
      },
    },
    precioPorNoche: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true, 
        min: 0.0,     
      },
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
       // isIn: [['disponible', 'ocupado', 'mantenimiento']],  podria funcionar?
      },
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,     
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "rooms",
    timestamps: false,
  }
);

export default Room;
