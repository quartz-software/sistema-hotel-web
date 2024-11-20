import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function encryptPassword(password) {
  const rounds = 10;
  const encryptedPassword = await bcrypt.hash(password, rounds);
  return encryptedPassword;
}

export async function authUser(userModel, password) {
  const isValid = await bcrypt.compare(password, userModel.password);
  return isValid;
}

export async function createToken(userModel) {
  let payload = { id: userModel.id, role: userModel.role };
  let secret = process.env.SECRET;
  let token = jwt.sign(payload, secret);
  return token;
}

export async function validateToken(token) {
  const payload = jwt.verify(token, process.env.SECRET);
  return payload;
}

export default {
  authUser,
  encryptPassword,
  validateToken,
  createToken,
};
