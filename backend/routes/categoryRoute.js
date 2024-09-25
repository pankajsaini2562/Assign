import express from "express";
import { addCategory, getCategory } from "../controllers/categoryController.js";
import isAuth from "../middleware/authMiddleware.js";
const router = express.Router();
//Add category
router.post("/add", isAuth, addCategory);
// list category
router.get("/", isAuth, getCategory);
export default router;
