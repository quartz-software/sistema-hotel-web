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
import RoomRoomPromotion from "./RoomRoomPromotion.js";
import RoomRate from "./RoomRate.js";
import RoomRoomRate from "./RoomRoomRate.js";
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
  RoomRoomPromotion,
  RoomRate,
  RoomRoomRate,
  Service,
  ServiceRoom,
  Stock,
  StockModification,
  Task,
  User,
};

function defineRelationships() {
  // Payment: bookingId
  Booking.hasOne(Payment, {
    foreignKey: "bookingId",
    as: "payment",
  });
  Payment.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking",
  });

  // PaymentDetail: paymentId
  Payment.hasMany(PaymentDetail, {
    foreignKey: "paymentId",
    as: "payment_details",
  });
  PaymentDetail.belongsTo(Payment, {
    foreignKey: "paymentId",
    as: "payment",
  });

  // RoomPromotion: roomId
  Room.belongsToMany(RoomPromotion, {
    through: RoomRoomPromotion,
    foreignKey: "roomId",
    otherKey: "roomPromotionId",
    as: "room_promotions",
  });
  RoomPromotion.belongsToMany(Room, {
    through: RoomRoomPromotion,
    foreignKey: "roomPromotionsId",
    otherKey: "roomId",
    as: "rooms",
  });

  // RoomRate: roomId
  Room.belongsToMany(RoomRate, {
    through: RoomRoomRate,
    foreignKey: "roomId",
    otherKey: "roomRateId",
    as: "room_rates",
  });
  RoomRate.belongsToMany(Room, {
    through: RoomRoomRate,
    foreignKey: "roomRateId",
    otherKey: "roomId",
    as: "rooms",
  });

  // RoomAvailability: roomId
  Room.hasMany(RoomAvailability, {
    foreignKey: "roomId",
    as: "room_availabilities",
  });
  RoomAvailability.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room",
  });
  //Booking: employeeId
  Employee.hasMany(Booking, {
    foreignKey: "employeeId",
    as: "bookings",
  });
  Booking.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Booking: clientId
  Client.hasMany(Booking, {
    foreignKey: "clientId",
    as: "bookings",
  });
  Booking.belongsTo(Client, {
    foreignKey: "clientId",
    as: "client",
  });

  // Employee: userId
  User.hasOne(Employee, {
    foreignKey: "userId",
    as: "employee",
  });
  Employee.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

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
  Booking.belongsToMany(Room, {
    through: BookingRoom,
    foreignKey: "bookingId",
    otherKey: "roomId",
    as: "rooms",
  });
  Room.belongsToMany(Booking, {
    through: BookingRoom,
    foreignKey: "roomId",
    otherKey: "bookingId",
    as: "bookings",
  });
  // RoomImage: roomId
  Room.hasMany(RoomImage, {
    foreignKey: "roomId",
    as: "images",
  });
  RoomImage.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room",
  });

  // ServiceRoom: roomId
  Room.belongsToMany(Service, {
    foreignKey: "roomId",
    otherKey: "serviceId",
    through: ServiceRoom,
    as: "services",
  });
  Service.belongsToMany(Room, {
    foreignKey: "serviceId",
    otherKey: "roomId",
    through: ServiceRoom,
    as: "rooms",
  });

  //Modification-stock: stockId
  Stock.hasMany(StockModification, {
    foreignKey: "stockId",
    as: "stock_modifications",
  });
  StockModification.belongsTo(Stock, {
    foreignKey: "stockId",
    as: "stock",
  });

  //Modification-stock: employeeId
  Employee.hasMany(StockModification, {
    foreignKey: "employeeId",
    as: "stock_modifications",
  });
  StockModification.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Task: employeeId
  Employee.hasMany(Task, {
    foreignKey: "employeeId",
    as: "tasks",
  });
  Task.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Task: additionalServiceId
  AdditionalService.hasOne(Task, {
    foreignKey: "additionalServiceId",
    as: "additional_service",
  });
  Task.belongsTo(AdditionalService, {
    foreignKey: "additionalServiceId",
    as: "task",
  });
}

defineRelationships();
export default { sequelize, models };
export { models };
export { sequelize };
