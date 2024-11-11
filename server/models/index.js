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
  // Employee: userId
  User.hasOne(Employee, { foreignKey: "userId", as: "employee" });
  Employee.belongsTo(User, { foreignKey: "userId", as: "user" });

  // AdditionalService: serviceId
  Service.hasMany(AdditionalService, {
    foreignKey: "serviceId",
    as: "additional_services",
  });
  AdditionalService.belongsTo(Service, {
    foreignKey: "serviceId",
    as: "service",
  });
  // AdditionalService: bookingId
  Booking.hasMany(AdditionalService, {
    foreignKey: "bookingId",
    as: "additional_services",
  });
  AdditionalService.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking",
  });

  // BookingRoom: bookingId
  Booking.hasMany(BookingRoom, {
    foreignKey: "bookingId",
    as: "booking_rooms",
  });
  BookingRoom.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking",
  });
  // BookingRoom: roomId
  Room.hasMany(BookingRoom, {
    foreignKey: "roomId",
    as: "booking_rooms",
  });
  BookingRoom.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room",
  });
}

defineRelationships();
export { sequelize };
export default models;
