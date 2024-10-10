import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Pago from "./Pago.js"; 

const DetallePago = sequelize.define(
  "DetallePago",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    concepto: {
      type: DataTypes.STRING(100), 
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    pagado: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: false, 
    },
    idPago: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Pago,
        key: "id",
      },
    },
  },
  {
    tableName: "detallePagos", 
    timestamps: false, 
  }
);
DetallePago.belongsTo(Pago, { foreignKey: "idPago" });

export default DetallePago;
