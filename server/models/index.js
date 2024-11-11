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
  User.hasOne(Employee, {
    foreignKey: "userId",
    as: "user_for_employee",
  });
  Employee.belongsTo(User, {
    foreignKey: "userId",
    as: "employee_for_user",
  });

  // AdditionalService: serviceId
  Service.hasMany(AdditionalService, {
    foreignKey: "serviceId",
    as: "additional_services_for_service",
  });
  AdditionalService.belongsTo(Service, {
    foreignKey: "serviceId",
    as: "service_for_additional_service",
  });
  // AdditionalService: bookingId
  Booking.hasMany(AdditionalService, {
    foreignKey: "bookingId",
    as: "additional_services_for_booking",
  });
  AdditionalService.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking_for_additional_service",
  });

  // BookingRoom: bookingId
  Booking.hasMany(BookingRoom, {
    foreignKey: "bookingId",
    as: "booking_rooms_for_booking",
  });
  BookingRoom.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking_for_booking_room",
  });
  // BookingRoom: roomId
  Room.hasMany(BookingRoom, {
    foreignKey: "roomId",
    as: "booking_rooms_for_room",
  });
  BookingRoom.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room_for_booking_room",
  });

  // RoomImage: roomId
  Room.hasMany(RoomImage, {
    foreignKey: "roomId",
    as: "room_images_for_room",
  });
  RoomImage.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room_for_room_image",
  });

  // ServiceRoom: roomId
  Room.hasMany(ServiceRoom, {
    foreignKey: "roomId",
    as: "service_rooms_for_room",
  });
  ServiceRoom.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room_for_service_room",
  });
  // ServiceRoom: serviceId
  Service.hasMany(ServiceRoom, {
    foreignKey: "serviceId",
    as: "service_rooms_for_service",
  });
  ServiceRoom.belongsTo(Service, {
    foreignKey: "serviceId",
    as: "service_for_service_room",
  });
}

defineRelationships();
export { sequelize };
export default models;
