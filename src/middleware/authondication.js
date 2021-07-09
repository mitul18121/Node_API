import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { clientRegister } from "../models/register.js";
dotenv.config();

export const authentication = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.status(401).send({ auth: false, message: "No token provided." });
    } else {
      const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
      const verify = await clientRegister.findOne({
        Email: decodeToken.payload.Email,
        isAdmin: true,
      });
      if (!verify) {
        throw new Error("Unauthorised access");
      } else {
        console.log(verify);
        next();
      }
    }
  } catch (error) {
    if (error.statusCode == 401) {
      const response = {
        statusCode: error.statusCode,
        message: error.message,
        data: null,
      };
      res.status(401).send(response);
    } else {
      const response = {
        statusCode: error.statusCode,
        message: error.message,
        data: null,
      };
      res.status(400).send(response);
    }
  }
};
