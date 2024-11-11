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

  //Task: employeeId
  Employee.hasMany(Task, { foreignKey: "employeeId", as: "tasks" });
  Task.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });

  //Task: roomId
  Room.hasMany(Task, { foreignKey: "roomId", as: "tasks" });
  Task.belongsTo(Room, { foreignKey: "roomId", as: "room" });

  Payment.belongsTo(Booking,{
    foreignKey:'idReserva',
    targetKey:'id'
  }),
  PaymentDetail.belongsTo(Payment,{
    foreignKey:'idPago',
    targetKey:'id'
  })
  RoomPromotion.belongsTo(Room,{
    foreignKey:'idHabitacion',
    targetKey:'id'
  })
}

defineRelationships();
export { sequelize };
export default models;
