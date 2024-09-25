import express from "express";
import { addCategory, getCategory } from "../controllers/categoryController.js";
import isAuth from "../middleware/authMiddleware.js";
const router = express.Router();
//Add income
router.post("/add", isAuth, addCategory);
// Lock income
router.post("/", isAuth, getCategory);
export default router;
