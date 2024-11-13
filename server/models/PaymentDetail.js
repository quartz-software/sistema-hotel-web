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
    concept: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.0,
      },
    },
    paymentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "payments",
        key: "id",
      },
    },
  },
  {
    tableName: "payment_details",
    timestamps: false,
  }
);

export default PaymentDetail;
