import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const token = async (payload) => {
  console.log(payload);
  return jwt.sign({ payload }, process.env.SECRET_KEY);
};

export { token };
