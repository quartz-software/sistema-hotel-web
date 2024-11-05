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
  },
  {
    tableName: "payment_details",
    timestamps: false,
  }
);

export default PaymentDetail;
