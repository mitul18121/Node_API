import { clientRegister } from "../models/register.js";
import bcrypt from "bcryptjs";
import { sMail } from "../services/sendmail.js";
import { generateOTP } from "../services/genrateOTP.js";
import { token } from "../utils/jwtToken.js";

export const registerContoller = async (req, res) => {
  try {
    const { Fname, Lname, Email, Phone, Password } = req.body;
    const hashPassword = await bcrypt.hash(Password, 10);
    console.log(`object`, hashPassword);
    const client = new clientRegister({
      Fname,
      Lname,
      Email,
      Phone,
      Password: hashPassword,
    });
    const createClient = await client.save();
    if (!createClient) {
      throw new Error("Somthing is wrong");
    } else {
      const varificationCode = generateOTP();
      await clientRegister.findOneAndUpdate(
        { Email },
        { VCode: varificationCode },
        { new: true }
      );
      const to = Email;
      const subject = "Registration Sucess...";
      const text = "Your Account on that Application is created sucessfully..";
      const html =
        `<h1>For Further process please enter given OTP  </h1>` +
        varificationCode +
        ` <br> <h4>Your Account on PG finder Web Application is created sucessfully...</h4>`;

      const sendMail = sMail(to, subject, text, html);
      res.status(200).send({
        success: true,
        message: "Register successfully done",
        data: createClient,
        mail: sendMail,
      });
    }
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

export const accountVerification = async (req, res) => {
  try {
    const { VCode } = req.body;
    const verifyOTP = await clientRegister.findOneAndUpdate(
      { VCode },
      { isActive: true }
    );
    if (!verifyOTP) {
      throw new Error({ status: 400, message: "invalid OTP", data: null });
    } else {
      res.status(200).send({
        success: true,
        message: "OTP verfication successfull",
        data: verifyOTP,
      });
    }
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

export const loginVerification = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log(`Email`, Email);
    const userEmail = await clientRegister.findOne({ Email });
    console.log(`userEmail`, userEmail);
    if (!userEmail) {
      throw new Error("Please Register first of all");
    } else {
      if (userEmail.isActive === false) {
        throw new Error("Verify Your Account");
      } else {
        const isMatch = await bcrypt.compare(Password, userEmail.Password);
        if (!isMatch) {
          const newerror = new Error();
          newerror.status = 400;
          newerror.message = "Test";
          throw newerror;
        } else {
          const payload = {
            Fname: userEmail.Fname,
            Email: userEmail.Email,
            isAdmin: userEmail.isAdmin,
            Phone: userEmail.Phone,
            isActive: userEmail.isActive,
          };
          const genarateToken = await token(payload);
          res.status(200).send({
            success: true,
            message: "Login success",
            data: genarateToken,
          });
        }
      }
    }
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

export const HomeController = async (req, res) => {
  try {
    res.send("HomePage");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const AllUserContoller = async (req, res) => {
  try {
    const allUser = await clientRegister.find();
    if (!allUser) {
      throw new Error({ status: 400, message: "No reacord found", data: null });
    } else {
      res.status(200).send({
        success: true,
        message: "Login success",
        data: allUser,
      });
    }
  } catch (e) {
    route.post("/Home", authentication, HomeController);
    res.status(500).send({ success: false, message: e.message });
  }
};

export const DeleteUserController = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteUser = await clientRegister.findByIdAndDelete({ _id });
    if (!deleteUser) {
      throw new Error({ status: 400, message: "User not found", data: null });
    } else {
      res.status(200).send({
        success: true,
        message: "User Deleted",
        data: deleteUser,
      });
    }
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

export const ViewUserController = async (req, res) => {
  try {
    const { _id } = req.params;
    const viewUser = await clientRegister.findOne({ _id });
    if (!viewUser) {
      const error = {
        statusCode: 400,
        message: "User not found",
      };
      throw error;
    } else {
      console.log(viewUser);
      res.status(200).send({
        stuatsCode: 200,
        message: "User found successfully",
        data: viewUser,
      });
    }
  } catch (error) {
    if (error.statusCode === 400) {
      const response = {
        statusCode: error.statusCode,
        message: error.message,
        data: null,
      };
    } else {
      const response = {
        statusCode: error.statusCode,
        message: error.message,
        data: null,
      };
      res.status(400).send(response);
    }
    res.status(500).send(error.message);
  }
};

export const EditUserController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { Fname, Lanme, Email, Phone } = req.body;
    const FoundUser = await clientRegister.findByIdAndUpdate(
      { _id },
      { Fname, Lanme, Email, Phone },
      { new: true }
    );
    if (!FoundUser) {
      throw new Error("Not found user");
    } else {
      res.status(200).send({
        status: 200,
        message: "User update successfully",
        data: FoundUser,
      });
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message, data: null });
  }
};
