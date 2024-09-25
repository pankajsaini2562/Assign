import express from "express";
import {
  addExpense,
  editExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import isAuth from "../middleware/authMiddleware.js";
const router = express.Router();
//Add income
router.post("/", isAuth, addExpense);
// Lock income
router.put("/edit/:id", isAuth, editExpense);
router.delete("/delete/:id", isAuth, deleteExpense);
export default router;
