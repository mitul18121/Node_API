import mongoose from "mongoose";

const clientRegsterSchema = new mongoose.Schema({
  Fname: {
    type: String,
    require: true,
  },
  Lname: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phone: {
    type: Number,
    require: true,
    // min: 10,
  },
  VCode: {
    type: Number,
    default: null,
  },
  Password: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const clientRegister = new mongoose.model("Register", clientRegsterSchema);

export { clientRegister };
