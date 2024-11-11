import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    fechaPago:{
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        isDate:true
      },
    },
    montoTotal:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false,
        validate:{
          isDecimal:true,
          min:0.0,
        }
    },
    metodo:{
      type:DataTypes.STRING(40),
      allowNull:true,
      validate:{
        isIn:["Tarjeta","Efectivo"]
      }
    },
    estado:{
      type:DataTypes.STRING(40),
      allowNull:false,
      validate:{
        isIn:["Pendiente","Cancealdo"]
      }
    },
    idReserva:{
      type:DataTypes.BIGINT,
      allowNull:false,
      validate:{
        isInt:true,
      },
      references:{
        model:"bookings",
        key:"id"
      }
    }
  },
  {
    tableName: "payments",
    timestamps: false,
  }
);

export default Payment;
