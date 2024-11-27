import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { encryptPassword } from "../utils/auth.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 500],
        isValid: (value) => {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!regex.test(value)) {
            throw new Error(
              "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial."
            );
          }
        },
      },
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [["employee", "client"]],
      },
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    documentType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastname1: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname2: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await encryptPassword(user.password);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await encryptPassword(user.password);
        }
      },
    },
  }
);

export default User;
