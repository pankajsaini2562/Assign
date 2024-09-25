import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "../routes/authRoute.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import incomeRoutes from "../routes/incomeRoute.js";
import expenseRoutes from "../routes/expenseRoute.js";
import categoryRoutes from "../routes/categoryRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database is connected ");

    app.listen(3000, () => {
      console.log("server is running successfully");
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/api/auth", (req, res) => {
  return res.json("message");
});
app.use("/api/auth", userRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/categories", categoryRoutes);
