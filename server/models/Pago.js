import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Pago = sequelize.define(
  "Pago",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    fechaPago: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    montoTotal: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    metodo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "pagos",
    timestamps: false, 
  }
);

export default Pago;
