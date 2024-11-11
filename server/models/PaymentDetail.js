import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PaymentDetail = sequelize.define(
  "PaymentDetail",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    concepto:{
      type:DataTypes.STRING(255),
      allowNull:false, 
    },
    monto:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false,
    },
    pagado:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false,
      validate:{
        min:0.0
      }  
    },
    idPago:{
      type:DataTypes.BIGINT,
      allowNull:false,
      references:{
        model:"payments",
        key:"id"
      }
    }
  },
  {
    tableName: "payment_details",
    timestamps: false,
  }
);

export default PaymentDetail;
