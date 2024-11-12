import sequelize from "../config/db.js";
import AdditionalService from "./AdditionalService.js";
import Booking from "./Booking.js";
import BookingRoom from "./BookingRoom.js";
import Client from "./Client.js";
import Employee from "./Employee.js";
import Payment from "./Payment.js";
import PaymentDetail from "./PaymentDetail.js";
import Room from "./Room.js";
import RoomAvailability from "./RoomAvailability.js";
import RoomImage from "./RoomImage.js";
import RoomPromotion from "./RoomPromotion.js";
import RoomRate from "./RoomRate.js";
import Service from "./Service.js";
import ServiceRoom from "./ServiceRoom.js";
import Stock from "./Stock.js";
import StockModification from "./StockModification.js";
import Task from "./Task.js";
import User from "./User.js";
const models = {
  AdditionalService,
  Booking,
  BookingRoom,
  Client,
  Employee,
  Payment,
  PaymentDetail,
  Room,
  RoomAvailability,
  RoomImage,
  RoomPromotion,
  RoomRate,
  Service,
  ServiceRoom,
  Stock,
  StockModification,
  Task,
  User,
};

function defineRelationships() {
  // RoomRate: roomId
  Room.hasMany(RoomRate, {
    foreignKey: "roomId",
    as: "room_rates_for_room",
  });
  RoomRate.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room_for_room_rate",
  });

  // RoomAvailability: roomId
  Room.hasMany(RoomAvailability, {
    foreignKey: "roomId",
    as: "room_availabilities_for_room",
  });
  RoomAvailability.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room_for_room_availability",
  });
}

defineRelationships();
export { sequelize };
export default models;
