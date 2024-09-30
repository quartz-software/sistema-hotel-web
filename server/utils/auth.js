import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function createUser({ password, email }) {
  try {
    const rounds = 10;
    const encrypted = await bcrypt.hash(password, rounds);

    const newUser = await User.create({
      email,
      password: encrypted,
      role: "client",
      status: "active",
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
  }
}

export async function authUser(password, encrypted) {
  const esValida = await bcrypt.compare(password, encrypted);
  return esValida;
}

export async function validateUser(token) {
  const isValid = jwt.verify(token, process.env.SECRET);
  return isValid;
}

export default {
  authUser,
  createUser,
  validateToken: validateUser,
};
