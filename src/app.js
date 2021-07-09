import dotenv from "dotenv";
import express from "express";
import { ConnectMongo } from "./db/conn.js";
import { route } from "./routes/routes.js";
import cors from "cors";
const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

dotenv.config();
ConnectMongo();
app.use(express.json());
app.use("/task/Api", route);

app.listen(port, () => {
  console.log(`Server is running at port number ${port}`);
});
