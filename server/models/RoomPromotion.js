import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomPromotion = sequelize.define(
  "RoomPromotion",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    descripcion:{
      type:DataTypes.STRING(255),
      allowNull:false
    },
    fechaInicio:{
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        isDate:true
      }
    },
    fechaFin:{
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        isDate:true
      }
    },
    descuento:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false
    },
    estado:{
      type:DataTypes.STRING(50),
      allowNull:false,
      validate:{
        isIn:["Activa","Expirada"]
      }
    },
    idHabitacion:{
      type:DataTypes.BIGINT,
      allowNull:false,
      references:{
        model:"rooms",
        key:"id"
      }
    }
  },
  {
    tableName: "room_promotions",
    timestamps: false,
  }
);

export default RoomPromotion;
