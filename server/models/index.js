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
  //Booking: employeeId
  Employee.hasMany(Booking, {
    foreignKey: "employeeId",
    as: "bookings_for_employee",
  });
  Booking.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee_for_booking",
  });

  //Booking: clientId
  Client.hasMany(Booking, {
    foreignKey: "clientId",
    as: "bookings_for_client",
  });
  Booking.belongsTo(Client, {
    foreignKey: "clientId",
    as: "client_for_booking",
  });

  // Employee: userId
  User.hasOne(Employee, { foreignKey: "userId", as: "employee" });
  Employee.belongsTo(User, { foreignKey: "userId", as: "user" });

  //Modification-stock: stockId
  Stock.hasMany(StockModification, {
    foreignKey: "stockId",
    as: "stock_modifications_for_stock",
  });
  StockModification.belongsTo(Stock, {
    foreignKey: "stockId",
    as: "stock_for_stock_modification",
  });

  //Modification-stock: employeeId
  Employee.hasMany(StockModification, {
    foreignKey: "employeeId",
    as: "stock_modifications_for_employee",
  });
  StockModification.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee_for_stock_modification",
  });
  //Task: employeeId
  Employee.hasMany(Task, { foreignKey: "employeeId", as: "tasks" });
  Task.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });

  //Task: roomId
  Room.hasMany(Task, { foreignKey: "roomId", as: "tasks" });
  Task.belongsTo(Room, { foreignKey: "roomId", as: "room" });
}

defineRelationships();
export { sequelize };
export default models;
