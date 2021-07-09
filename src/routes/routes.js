import express from "express";
import {
  registerContoller,
  accountVerification,
  loginVerification,
  HomeController,
  AllUserContoller,
  DeleteUserController,
  ViewUserController,
  EditUserController,
} from "../controller/registerController.js";
import { authentication } from "../middleware/authondication.js";

const route = express.Router();

route.post("/Register", registerContoller);
route.post("/VerifyOTP", accountVerification);
route.post("/Login", loginVerification);
route.post("/Home", authentication, HomeController);
route.get("/AllUser", authentication, AllUserContoller);
route.delete("/DeleteUser/:_id", authentication, DeleteUserController);
route.get("/ViewUserUser/:_id", authentication, ViewUserController);
route.put("/EditUser/:_id", authentication, EditUserController);

export { route };
