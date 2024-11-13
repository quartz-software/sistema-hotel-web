import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoomImage = sequelize.define(
  "RoomImage",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["normal", "3d", "panoramic"]],
      },
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true,
      isLocalPath(value) {
        if (value && !value.startsWith("/")) {
          throw new Error("Path must start with '/' for local images.");
        }
      },
      isImage(value) {
        if (value && !/\.(jpg|jpeg|png|gif|bmp)$/i.test(value)) {
          throw new Error(
            "Path must point to a valid image file (jpg, jpeg, png, gif, bmp)."
          );
        }
      },
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl(value) {
          if (value && !/^https?:\/\//.test(value)) {
            throw new Error("URL must be a valid HTTP or HTTPS URL.");
          }
        },
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "rooms",
        key: "id",
      },
    },
  },
  {
    tableName: "room_images",
    timestamps: false,
    validate: {
      onlyOneOfUrlOrPath() {
        if (this.path && this.url) {
          throw new Error("You can only set one of 'path' or 'url', not both.");
        }
      },
    },
  }
);

export default RoomImage;
