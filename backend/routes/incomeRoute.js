import express from "express";
import {
  addIncome,
  getIncome,
  lockIncome,
} from "../controllers/incomeController.js";
import isAuth from "../middleware/authMiddleware.js";
const router = express.Router();
//Add income
router.post("/", isAuth, addIncome);
//Get income
router.get("/", getIncome);
// Lock monthly  income
router.post("/month/:id", isAuth, lockIncome);
export default router;
